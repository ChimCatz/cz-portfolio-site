(function initSupabaseClient(windowObject) {
    const PROJECT_URL = 'https://nikhldetpxbmifydujzh.supabase.co';
    const PUBLISHABLE_KEY = 'sb_publishable_Ubf_SoOMEsOrWwEydsJivg__UW6mS03';

    windowObject.SUPABASE_CONFIG = {
        projectUrl: PROJECT_URL,
        publishableKey: PUBLISHABLE_KEY,
    };

    if (!windowObject.supabase || typeof windowObject.supabase.createClient !== 'function') {
        console.error('[Supabase] CDN failed to load or createClient is unavailable.');
        windowObject.supabaseClient = null;
        windowObject.supabaseInitError = new Error('Supabase CDN is unavailable.');
        windowObject.supabaseReady = Promise.reject(windowObject.supabaseInitError);
        windowObject.supabaseReady.catch(function noop() {});
        return;
    }

    try {
        const client = windowObject.supabase.createClient(PROJECT_URL, PUBLISHABLE_KEY);

        windowObject.supabaseClient = client;
        windowObject.supabaseInitError = null;
        windowObject.supabaseReady = Promise.resolve(client);

        if (!client) {
            throw new Error('Supabase client initialization returned an empty value.');
        }

        console.info('[Supabase] Client initialized.');
    } catch (error) {
        console.error('[Supabase] Failed to initialize client.', error);
        windowObject.supabaseClient = null;
        windowObject.supabaseInitError = error;
        windowObject.supabaseReady = Promise.reject(error);
        windowObject.supabaseReady.catch(function noop() {});
    }
})(window);
