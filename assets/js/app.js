const page = document.body.dataset.page;
const navItems = [...document.querySelectorAll('#sidebar li')];
const navLinks = [...document.querySelectorAll('#sidebar a[data-target]')];

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

    const sections = navLinks
        .map((link) => {
            const href = link.getAttribute('href');
            return href?.startsWith('#') ? document.querySelector(href) : null;
        })
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) {
                setActiveNav(visible.target.id);
            }
        },
        {
            rootMargin: '-25% 0px -45% 0px',
            threshold: [0.2, 0.35, 0.55]
        }
    );

    sections.forEach((section) => observer.observe(section));
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

    if (!trigger || !panel) {
        return;
    }

    trigger.addEventListener('click', () => {
        const isHidden = panel.hasAttribute('hidden');
        if (isHidden) {
            panel.removeAttribute('hidden');
        } else {
            panel.setAttribute('hidden', '');
        }
    });
};

initSectionSpy();
initCarousel('projects-carousel');
initCarousel('announcements-carousel');
initEntryToggle();
