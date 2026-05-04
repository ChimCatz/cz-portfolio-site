(function initParticlesBackground(windowObject, documentObject) {
    const STATE_KEY = '__czParticlesBackground';
    const CANVAS_ID = 'site-particles-canvas';
    const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
    const MOBILE_QUERY = '(max-width: 767px)';

    const state = windowObject[STATE_KEY] || (windowObject[STATE_KEY] = {
        bound: false,
        canvas: null,
        instance: null,
        signature: '',
        mediaQueryList: null,
        refreshFrame: null,
    });

    const getThemeValue = (name, fallbackValue) => {
        const value = windowObject.getComputedStyle(documentObject.documentElement).getPropertyValue(name).trim();
        return value || fallbackValue;
    };

    const prefersReducedMotion = () => windowObject.matchMedia(REDUCED_MOTION_QUERY).matches;
    const isMobileViewport = () => windowObject.matchMedia(MOBILE_QUERY).matches;
    const getMoveInteractionType = () => windowObject.CanvasParticles?.interactionType?.MOVE ?? 2;

    const ensureCanvas = () => {
        if (state.canvas?.isConnected) {
            return state.canvas;
        }

        let canvas = documentObject.getElementById(CANVAS_ID);

        if (!canvas) {
            canvas = documentObject.createElement('canvas');
            canvas.id = CANVAS_ID;
            canvas.setAttribute('aria-hidden', 'true');
            documentObject.body.prepend(canvas);
        }

        state.canvas = canvas;
        return canvas;
    };

    const recreateCanvas = () => {
        const currentCanvas = state.canvas?.isConnected ? state.canvas : documentObject.getElementById(CANVAS_ID);

        if (currentCanvas?.parentNode) {
            const nextCanvas = currentCanvas.cloneNode(false);
            nextCanvas.id = CANVAS_ID;
            nextCanvas.setAttribute('aria-hidden', 'true');
            currentCanvas.parentNode.replaceChild(nextCanvas, currentCanvas);
            state.canvas = nextCanvas;
            return nextCanvas;
        }

        state.canvas = null;
        return ensureCanvas();
    };

    const stopInstance = () => {
        if (!state.instance || typeof state.instance.stop !== 'function') {
            state.instance = null;
            return;
        }

        try {
            state.instance.stop({ clear: false });
        } catch (error) {
            try {
                state.instance.stop();
            } catch (stopError) {
                console.warn('[Particles] Failed to stop previous CanvasParticles instance.', stopError);
            }
        }

        state.instance = null;
    };

    const clearCanvas = () => {
        const canvas = ensureCanvas();
        const context = typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;

        if (!context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const getThemeSignature = () => {
        const background = getThemeValue('--page-bg', '#0F0F0F');
        const particleColor = getThemeValue('--particle-color', '#FFFFFF');
        return `${background}|${particleColor}|${prefersReducedMotion()}|${isMobileViewport()}`;
    };

    const buildOptions = () => ({
        background: getThemeValue('--page-bg', '#0F0F0F'),
        framesPerUpdate: isMobileViewport() ? 2 : 1,
        stopOnLeave: false,
        mouse: {
            interactionType: getMoveInteractionType(),
            connectDistMult: 0.8,
            distRatio: 1,
        },
        particles: {
            color: getThemeValue('--particle-color', '#ffffff'),
            ppm: isMobileViewport() ? 90 : 140,
            max: isMobileViewport() ? 140 : 220,
            maxWork: 18,
            connectDistance: isMobileViewport() ? 90 : 130,
            relSize: isMobileViewport() ? 0.95 : 1.1,
            relSpeed: isMobileViewport() ? 0.42 : 0.5,
            rotationSpeed: 0.18,
        },
    });

    const renderStaticBackground = () => {
        const canvas = ensureCanvas();
        canvas.style.background = getThemeValue('--page-bg', '#0F0F0F');
    };

    const startParticles = ({ force = false } = {}) => {
        const canvas = force ? recreateCanvas() : ensureCanvas();
        const nextSignature = getThemeSignature();

        renderStaticBackground();

        if (!force && state.instance && state.signature === nextSignature) {
            return;
        }

        stopInstance();
        clearCanvas();
        state.signature = nextSignature;

        if (prefersReducedMotion()) {
            return;
        }

        if (typeof windowObject.CanvasParticles !== 'function') {
            console.warn('[Particles] CanvasParticles is not available on window.');
            return;
        }

        try {
            const instance = new windowObject.CanvasParticles(`#${CANVAS_ID}`, buildOptions());
            instance.start();
            state.instance = instance;
        } catch (error) {
            console.error('[Particles] Failed to initialize CanvasParticles.', error);
            state.instance = null;
        }
    };

    const scheduleRefresh = (options = {}) => {
        if (state.refreshFrame) {
            windowObject.cancelAnimationFrame(state.refreshFrame);
        }

        state.refreshFrame = windowObject.requestAnimationFrame(() => {
            state.refreshFrame = null;
            startParticles(options);
        });
    };

    const bindListeners = () => {
        if (state.bound) {
            return;
        }

        state.bound = true;
        state.mediaQueryList = windowObject.matchMedia(REDUCED_MOTION_QUERY);

        const handleMotionChange = () => {
            if (prefersReducedMotion()) {
                stopInstance();
                clearCanvas();
                renderStaticBackground();
                state.signature = getThemeSignature();
                return;
            }

            scheduleRefresh({ force: true });
        };

        if (typeof state.mediaQueryList.addEventListener === 'function') {
            state.mediaQueryList.addEventListener('change', handleMotionChange);
        } else if (typeof state.mediaQueryList.addListener === 'function') {
            state.mediaQueryList.addListener(handleMotionChange);
        }

        windowObject.addEventListener('resize', () => scheduleRefresh({ force: true }), { passive: true });
        windowObject.addEventListener('cz-themechange', () => scheduleRefresh({ force: true }));
        windowObject.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                scheduleRefresh({ force: true });
            }
        });
    };

    const init = () => {
        if (!documentObject.body) {
            return;
        }

        bindListeners();
        startParticles({ force: true });
    };

    if (documentObject.readyState === 'loading') {
        documentObject.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})(window, document);
