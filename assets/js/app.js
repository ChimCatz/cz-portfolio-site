const page = document.body.dataset.page;
const navItems = [...document.querySelectorAll('#sidebar li')];
const navLinks = [...document.querySelectorAll('#sidebar a[data-target]')];

const setActiveNav = (target) => {
    navItems.forEach((item) => {
        const link = item.querySelector('a[data-target]');
        item.classList.toggle('active', link?.dataset.target === target);
    });
};

if (page === 'life') {
    setActiveNav('life');
} else {
    const sections = navLinks
        .map((link) => {
            const href = link.getAttribute('href');
            return href?.startsWith('#') ? document.querySelector(href) : null;
        })
        .filter(Boolean);

    if (sections.length) {
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
    }
}
