const page = document.body.dataset.page;
const navItems = [...document.querySelectorAll('#sidebar li')];
const navLinks = [...document.querySelectorAll('#sidebar a[data-target]')];
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
};

const initSectionSpy = () => {
    if (page === 'lords-recovery') {
        setActiveNav('lords-recovery');
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

const initCarousel = (name) => {
    const shell = document.querySelector(`[data-carousel="${name}"]`);

    if (!shell) {
        return;
    }

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

// =========================
// GAME SWITCH (NEW)
// =========================

const initGameSwitch = () => {
    const cards = document.querySelectorAll('.game-card');
    const panels = document.querySelectorAll('.game-panel');

    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;

            cards.forEach(c => c.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            card.classList.add('active');
            document.getElementById(`game-${game}`).classList.add('active');
        });
    });
};

initGameSwitch();
initSectionSpy();
initCarousel('projects-carousel');
initCarousel('announcements-carousel');
initEntryToggle();

