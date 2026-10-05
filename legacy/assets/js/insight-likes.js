(function initInsightLikes(windowObject, documentObject) {
    const pageType = documentObject.body?.dataset.page;

    if (pageType !== 'insight-detail') {
        return;
    }

    const supabaseClient = windowObject.supabaseClient;
    const likeButton = documentObject.querySelector('[data-insight-like]');
    const likeCountNode = documentObject.querySelector('[data-insight-like-count]');
    const likeStatusNode = documentObject.querySelector('[data-insight-like-status]');
    const storageKey = 'cz-visitor-id';
    const buttonSlug = likeButton?.dataset.slug;
    const slugSource = documentObject.querySelector('[data-current-slug]')?.dataset.currentSlug;

    if (!likeButton || !likeCountNode || !supabaseClient) {
        return;
    }

    const fallbackSlug = windowObject.location.pathname.split('/').pop()?.replace(/\.html$/i, '') || '';
    const insightSlug = buttonSlug || slugSource || fallbackSlug;

    if (!insightSlug) {
        likeButton.disabled = true;
        likeButton.dataset.state = 'error';
        if (likeStatusNode) {
            likeStatusNode.textContent = 'Unavailable';
        }
        return;
    }

    const createVisitorId = () => {
        if (windowObject.crypto && typeof windowObject.crypto.randomUUID === 'function') {
            return windowObject.crypto.randomUUID();
        }

        return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    };

    const getVisitorId = () => {
        try {
            let storedId = windowObject.localStorage.getItem(storageKey);

            if (!storedId) {
                storedId = createVisitorId();
                windowObject.localStorage.setItem(storageKey, storedId);
            }

            return storedId;
        } catch (error) {
            return createVisitorId();
        }
    };

    const visitorId = getVisitorId();
    let hasLiked = false;
    let isSaving = false;
    let currentCount = 0;
    let hasError = false;

    const renderState = () => {
        likeButton.classList.toggle('is-liked', hasLiked);
        likeButton.classList.toggle('is-loading', isSaving);
        likeButton.disabled = isSaving || hasLiked || hasError;
        likeButton.dataset.state = hasError ? 'error' : isSaving ? 'loading' : hasLiked ? 'liked' : 'idle';
        likeButton.setAttribute(
            'aria-label',
            hasError ? 'Insight like is unavailable right now' : hasLiked ? 'You already liked this insight' : 'Like this insight'
        );
        likeButton.setAttribute('aria-pressed', hasLiked ? 'true' : 'false');
        likeCountNode.textContent = String(currentCount);

        if (likeStatusNode) {
            likeStatusNode.textContent = hasError ? 'Unavailable' : isSaving ? 'Saving like...' : hasLiked ? 'Liked' : 'Like';
        }
    };

    const loadLikeCount = async () => {
        const { count, error } = await supabaseClient
            .from('insight_likes')
            .select('*', { count: 'exact', head: true })
            .eq('slug', insightSlug);

        if (error) {
            throw error;
        }

        currentCount = typeof count === 'number' ? count : 0;
    };

    const loadLikedState = async () => {
        const { data, error } = await supabaseClient
            .from('insight_likes')
            .select('slug')
            .eq('slug', insightSlug)
            .eq('visitor_id', visitorId)
            .limit(1);

        if (error) {
            throw error;
        }

        hasLiked = Array.isArray(data) && data.length > 0;
    };

    const hydrateLikes = async () => {
        isSaving = true;
        renderState();

        try {
            await Promise.all([loadLikeCount(), loadLikedState()]);
        } catch (error) {
            console.error('[Insight Likes] Failed to load like state.', error);
            hasError = true;
        } finally {
            isSaving = false;
            renderState();
        }
    };

    const saveLike = async () => {
        if (hasLiked || isSaving) {
            return;
        }

        isSaving = true;
        renderState();

        try {
            const { error } = await supabaseClient
                .from('insight_likes')
                .insert({
                    slug: insightSlug,
                    visitor_id: visitorId,
                });

            if (error && error.code !== '23505') {
                throw error;
            }

            hasLiked = true;
            currentCount += error?.code === '23505' ? 0 : 1;

            if (error?.code === '23505') {
                await loadLikeCount();
            }
        } catch (error) {
            console.error('[Insight Likes] Failed to save like.', error);
            hasError = true;
        } finally {
            isSaving = false;
            renderState();
        }
    };

    likeButton.addEventListener('click', () => {
        saveLike();
    });

    renderState();
    hydrateLikes();
})(window, document);
