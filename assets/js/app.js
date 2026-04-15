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
    if (page === 'lords-recovery') {
        setActiveNav('lords-recovery');
        return;
    }

    if (page === 'project-detail') {
        setActiveNav('projects');
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

const initCarousel = (shell) => {
    const name = shell.dataset.carousel;

    const cards = [...shell.querySelectorAll('.carousel-card')];
    const dotsWrap = shell.querySelector('.carousel-dots');
    const prev = document.querySelector(`[data-carousel-prev="${name}"]`);
    const next = document.querySelector(`[data-carousel-next="${name}"]`);

    if (!cards.length) {
        return;
    }

    let index = cards.findIndex((card) => card.classList.contains('is-active'));
    index = index >= 0 ? index : 0;

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
        cards.forEach((card, cardIndex) => {
            card.classList.toggle('is-active', cardIndex === index);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === index);
        });
    };

    prev?.addEventListener('click', () => render(index - 1));
    next?.addEventListener('click', () => render(index + 1));

    render(index);
};

const initCarousels = () => {
    const carousels = [...document.querySelectorAll('[data-carousel]')];
    carousels.forEach((shell) => initCarousel(shell));
};

const initEntryToggle = () => {
    const trigger = document.querySelector('[data-entry-toggle]');
    const panel = document.querySelector('[data-entry-panel]');
    const closers = [...document.querySelectorAll('[data-entry-close]')];

    if (!trigger || !panel) {
        return;
    }

    const openPanel = () => {
        panel.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closePanel = () => {
        panel.setAttribute('hidden', '');
        document.body.style.overflow = '';
    };

    trigger.addEventListener('click', () => {
        if (panel.hasAttribute('hidden')) {
            openPanel();
        } else {
            closePanel();
        }
    });

    closers.forEach((closer) => {
        closer.addEventListener('click', closePanel);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hasAttribute('hidden')) {
            closePanel();
        }
    });
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

const initAuthOverlay = () => {
    const panel = document.querySelector('[data-auth-panel]');
    const openers = [...document.querySelectorAll('[data-auth-open]')];
    const closers = [...document.querySelectorAll('[data-auth-close]')];

    if (!panel || !openers.length) {
        return;
    }

    const openPanel = () => {
        panel.removeAttribute('hidden');
        document.body.classList.add('auth-open');
        document.body.style.overflow = 'hidden';
    };

    const closePanel = () => {
        panel.setAttribute('hidden', '');
        document.body.classList.remove('auth-open');
        document.body.style.overflow = '';
    };

    openers.forEach((opener) => {
        opener.addEventListener('click', openPanel);
    });

    closers.forEach((closer) => {
        closer.addEventListener('click', closePanel);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hasAttribute('hidden')) {
            closePanel();
        }
    });
};

// =========================
// GAME SWITCH (NEW)
// =========================

const initGameSwitch = () => {
    const cards = [...document.querySelectorAll('.game-card')];
    const panels = [...document.querySelectorAll('.game-panel')];

    if (!cards.length || !panels.length) {
        return;
    }

    const activateGame = (game) => {
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

    const activeCard = cards.find((card) => card.classList.contains('active')) ?? cards[0];
    activateGame(activeCard.dataset.game);
};

initGameSwitch();
initSectionSpy();
initTopbarSwap();
initAuthOverlay();
initCarousels();
initEntryToggle();
