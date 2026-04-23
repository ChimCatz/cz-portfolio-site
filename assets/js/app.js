const page = document.body.dataset.page;
const navItems = [...document.querySelectorAll('#sidebar li')];
const navLinks = [...document.querySelectorAll('#sidebar a[data-target]')];
const topbar = document.querySelector('[data-topbar]');
const topbarLinks = [...document.querySelectorAll('.topbar-nav a[data-target]')];
const pageSections = navLinks
    .map((link) => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) {
            return null;
        }

        const section = document.querySelector(href);
        return section ? { id: section.id, element: section } : null;
    })
    .filter(Boolean);

const setActiveNav = (target) => {
    navItems.forEach((item) => {
        const link = item.querySelector('a[data-target]');
        item.classList.toggle('active', link?.dataset.target === target);
    });

    topbarLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.target === target);
    });
};

const initSectionSpy = () => {
    if (page === 'project-detail') {
        setActiveNav('projects');
        return;
    }

    if (page === 'insight-detail') {
        setActiveNav('insights');
        return;
    }

    if (!pageSections.length) {
        return;
    }

    const updateActiveSection = () => {
        const marker = window.scrollY + window.innerHeight * 0.18;
        let activeId = pageSections[0].id;

        pageSections.forEach(({ id, element }) => {
            if (marker >= element.offsetTop) {
                activeId = id;
            }
        });

        setActiveNav(activeId);
    };

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) {
            return;
        }

        link.addEventListener('click', () => {
            const target = href.slice(1);
            setActiveNav(target);
            window.requestAnimationFrame(updateActiveSection);
        });
    });

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('load', updateActiveSection);

    updateActiveSection();
};

const isMobileInsightsViewport = () => window.matchMedia('(max-width: 980px)').matches;

const syncInsightsCarouselLayout = () => {
    const shell = document.querySelector('[data-carousel="insights"]');
    const track = shell?.querySelector('.carousel-track');

    if (!track) {
        return;
    }

    if (!track.dataset.desktopMarkup) {
        track.dataset.desktopMarkup = track.innerHTML;
    }

    const shouldUseMobileLayout = isMobileInsightsViewport();
    const currentLayout = track.dataset.layoutMode || 'desktop';

    if (shouldUseMobileLayout && currentLayout !== 'mobile') {
        const temp = document.createElement('div');
        temp.innerHTML = track.dataset.desktopMarkup;

        const seenLinks = new Set();
        const cards = [...temp.querySelectorAll('.insight-card')].filter((card) => {
            const href = card.querySelector('.insight-card-link')?.getAttribute('href') || '';
            if (!href || seenLinks.has(href)) {
                return false;
            }
            seenLinks.add(href);
            return true;
        });

        track.innerHTML = cards
            .map((card, cardIndex) => `
                <div class="carousel-card${cardIndex === 0 ? ' is-active' : ''}">
                    <div class="insights-card-grid">
                        ${card.outerHTML}
                    </div>
                </div>
            `)
            .join('');

        track.dataset.layoutMode = 'mobile';
        return;
    }

    if (!shouldUseMobileLayout && currentLayout !== 'desktop') {
        track.innerHTML = track.dataset.desktopMarkup;
        track.dataset.layoutMode = 'desktop';
    }
};

const initCarousel = (shell) => {
    const name = shell.dataset.carousel;
    const dotsWrap = shell.querySelector('.carousel-dots');
    const prev = document.querySelector(`[data-carousel-prev="${name}"]`);
    const next = document.querySelector(`[data-carousel-next="${name}"]`);
    const cards = [...shell.querySelectorAll('.carousel-card')];

    if (!cards.length) {
        return;
    }

    shell._carouselCleanup?.();

    let index = typeof shell._carouselIndex === 'number' ? shell._carouselIndex : cards.findIndex((card) => card.classList.contains('is-active'));
    index = index >= 0 ? Math.min(index, cards.length - 1) : 0;

    if (dotsWrap) {
        dotsWrap.innerHTML = '';
    }

    const dots = cards.map((_, dotIndex) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${dotIndex + 1}`);
        dot.addEventListener('click', () => render(dotIndex));
        dotsWrap?.appendChild(dot);
        return dot;
    });

    const render = (nextIndex) => {
        index = (nextIndex + cards.length) % cards.length;
        shell._carouselIndex = index;
        cards.forEach((card, cardIndex) => {
            card.classList.toggle('is-active', cardIndex === index);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === index);
        });

        const isDisabled = cards.length <= 1;
        [prev, next].forEach((button) => {
            if (!button) {
                return;
            }

            button.disabled = isDisabled;
            button.setAttribute('aria-disabled', String(isDisabled));
        });
    };

    const onPrev = () => render(index - 1);
    const onNext = () => render(index + 1);

    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);

    shell._carouselCleanup = () => {
        prev?.removeEventListener('click', onPrev);
        next?.removeEventListener('click', onNext);
    };

    render(index);
};

const initCarousels = () => {
    syncInsightsCarouselLayout();
    const carousels = [...document.querySelectorAll('[data-carousel]')];
    carousels.forEach((shell) => initCarousel(shell));
};

const initTopbarSwap = () => {
    if (page !== 'home' || !topbar) {
        return;
    }

    const syncBars = () => {
        const atTop = window.scrollY < 24;
        document.body.classList.toggle('is-at-top', atTop);
    };

    window.addEventListener('scroll', syncBars, { passive: true });
    window.addEventListener('resize', syncBars);
    window.addEventListener('load', syncBars);
    syncBars();
};

const initScrollTopButton = () => {
    const button = document.querySelector('[data-scroll-top]');

    if (!button) {
        return;
    }

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
};

// =========================
// GAME SWITCH (NEW)
// =========================

const initGameSwitch = () => {
    const cards = [...document.querySelectorAll('.game-card')];
    const panels = [...document.querySelectorAll('.game-panel')];
    const display = document.querySelector('.game-display');

    if (!cards.length || !panels.length) {
        return;
    }

    const isMobileViewport = () => window.matchMedia('(max-width: 980px)').matches;

    const syncGameAvailability = () => {
        const isMobile = isMobileViewport();

        if (isMobile) {
            display?.setAttribute('hidden', '');
        }

        cards.forEach((card) => {
            card.setAttribute('aria-disabled', String(isMobile));
            card.setAttribute('tabindex', isMobile ? '-1' : '0');
        });
    };

    const activateGame = (game) => {
        if (isMobileViewport()) {
            return;
        }

        display?.removeAttribute('hidden');

        cards.forEach((card) => {
            const isActive = card.dataset.game === game;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-selected', String(isActive));
            card.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach((panel) => {
            const isActive = panel.id === `game-${game}`;
            panel.classList.toggle('active', isActive);
            panel.toggleAttribute('hidden', !isActive);
        });
    };

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            activateGame(card.dataset.game);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                return;
            }

            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const currentIndex = cards.indexOf(card);
            const nextIndex = (currentIndex + direction + cards.length) % cards.length;
            const nextCard = cards[nextIndex];

            activateGame(nextCard.dataset.game);
            nextCard.focus();
        });
    });

    window.addEventListener('resize', syncGameAvailability);
    syncGameAvailability();
};

initGameSwitch();
initSectionSpy();
initTopbarSwap();
initCarousels();
initScrollTopButton();

let carouselResizeFrame = null;
window.addEventListener('resize', () => {
    if (carouselResizeFrame) {
        window.cancelAnimationFrame(carouselResizeFrame);
    }

    carouselResizeFrame = window.requestAnimationFrame(() => {
        initCarousels();
        carouselResizeFrame = null;
    });
});
