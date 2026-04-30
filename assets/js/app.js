const page = document.body.dataset.page;
const navItems = [...document.querySelectorAll('#sidebar li')];
const navLinks = [...document.querySelectorAll('#sidebar a[data-target]')];
const topbar = document.querySelector('[data-topbar]');
const topbarLinks = [...document.querySelectorAll('.topbar-nav a[data-target]')];
const themeToggleButtons = [...document.querySelectorAll('[data-theme-toggle]')];
const THEME_STORAGE_KEY = 'cz-theme';
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

const getStoredTheme = () => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    } catch (error) {
        return 'dark';
    }
};

const persistTheme = (theme) => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // Ignore storage issues and keep the current in-memory theme.
    }
};

const syncThemeToggleButton = (button, theme) => {
    if (!button) {
        return;
    }

    const isDark = theme === 'dark';
    const icon = button.querySelector('.theme-toggle-icon');
    const label = button.querySelector('.nav-label');
    const nextLabel = isDark ? 'Light Mode' : 'Dark Mode';
    const iconPath = isDark ? button.dataset.iconLight : button.dataset.iconDark;

    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);

    if (icon && iconPath) {
        icon.src = iconPath;
    }

    if (label) {
        label.textContent = nextLabel;
    }
};

const applyTheme = (theme) => {
    const nextTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    document.body.dataset.themeMode = nextTheme;
    document.body.classList.toggle('theme-light', nextTheme === 'light');
    document.body.classList.toggle('theme-dark', nextTheme === 'dark');

    themeToggleButtons.forEach((button) => syncThemeToggleButton(button, nextTheme));
};

const initTheme = () => {
    const initialTheme = getStoredTheme();
    applyTheme(initialTheme);

    themeToggleButtons.forEach((button) => {
        let switchTimer = null;

        button.addEventListener('click', () => {
            const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
            applyTheme(nextTheme);
            persistTheme(nextTheme);

            button.classList.add('is-switching');
            window.clearTimeout(switchTimer);
            switchTimer = window.setTimeout(() => {
                button.classList.remove('is-switching');
            }, 220);
        });
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

const isMobileCarouselViewport = () => window.matchMedia('(max-width: 899px)').matches;

const PROJECT_ITEMS = [
    {
        slug: 'leadflow-etl',
        href: 'leadflow-etl.html',
        title: 'LeadFlow ETL',
        image: '../assets/images/leadflow-etl/leaderboard.png',
        image_alt: 'LeadFlow ETL leaderboard image.',
        copy: 'Automated CRM data transformation across multi-source exports, turning messy CSV files into clean import-ready records.',
        bullets: [
            '4-8 hours reduced to under 2 minutes',
            'Source-aware ETL for Zoho, Vtiger, Lusha, and Pipileads',
            '95%+ cleaner, more reliable CRM imports',
        ],
    },
    {
        slug: 'csv-advanced-search-engine',
        href: 'csv-advanced-search-engine.html',
        title: 'CSV Advanced Search Engine',
        image: '../assets/images/csv-advanced-search-engine/leaderboard.png',
        image_alt: 'CSV Advanced Search Engine leaderboard image.',
        copy: 'High-speed search engine for large lead datasets, designed around messy company names, job titles, and bulk filtering.',
        bullets: [
            '1-3 hours reduced to under 10 seconds',
            'Handles 40K-100K+ lead records smoothly',
            'Bulk company and designation filtering with indexing',
        ],
    },
    {
        slug: 'call-conversion-tool',
        href: 'call-conversion-tool.html',
        title: 'VOIP Call Conversion Tool',
        image: '../assets/images/call-conversion-tool/leaderboard.png',
        image_alt: 'VOIP Call Conversion Tool leaderboard image.',
        copy: 'Cross-matches VOIP call logs and CRM exports to identify valid conversions through standardized matching and reporting.',
        bullets: [
            'About 60 minutes reduced to under 15 seconds',
            'Layered phone matching across contact fields',
            'Consistent conversion reports',
        ],
    },
    {
        slug: 'data-pivot-table-tool',
        href: 'data-pivot-table-tool.html',
        title: 'Data Pivot Table Tool',
        image: '../assets/images/data-pivot-table-tool/leaderboard.png',
        image_alt: 'Data Pivot Table Tool leaderboard image.',
        copy: 'Built to automate repetitive CRM reporting with faster filtering, reusable sessions, and pivot-style summaries in one flow.',
        bullets: [
            '20-30 minutes reduced to under 20 seconds',
            'Automatic column mapping and report generation',
            'Session-based workflows for recurring analysis',
        ],
    },
];

const INSIGHT_ITEMS = [
    {
        slug: 'why-data-pulled-me-in-and-why-it-matters-more-than-ever',
        href: 'why-data-pulled-me-in-and-why-it-matters-more-than-ever.html',
        title: 'Why Data Pulled Me In And Why It Matters More Than Ever',
        image: '../content/insights/insight-01/insight-1-header.png',
        image_alt: 'Why Data Pulled Me In And Why It Matters More Than Ever header image.',
        date: 'March 30, 2026',
        copy: 'A personal breakdown of how curiosity led me into Data Analytics, and why data, not AI, is the real driver behind modern systems.',
    },
    {
        slug: 'from-spreadsheets-to-scale-my-journey-through-excel-google-sheets-and-bigquery',
        href: 'from-spreadsheets-to-scale-my-journey-through-excel-google-sheets-and-bigquery.html',
        title: 'From Spreadsheets to Scale - My Journey Through Excel, Google Sheets, and BigQuery',
        image: '../content/insights/insight-02/insight-2-header.png',
        image_alt: 'From Spreadsheets to Scale My Journey Through Excel Google Sheets and BigQuery header image.',
        date: 'April 8, 2026',
        copy: 'A practical journey through Excel, Google Sheets, and BigQuery: how each tool fits, where it breaks, and how combining them creates a scalable data workflow.',
    },
    {
        slug: 'vibe-coding-from-writing-code-to-designing-systems',
        href: 'vibe-coding-from-writing-code-to-designing-systems.html',
        title: 'Vibe Coding - From Writing Code to Designing Systems',
        image: '../content/insights/insight-03/insight-3-header.png',
        image_alt: 'Vibe Coding From Writing Code to Designing Systems header image.',
        date: 'April 12, 2026',
        copy: 'I started by writing every line of code manually. Now I build systems by describing them. This is how vibe coding changed the way I think and work.',
    },
    {
        slug: 'hidden-data-what-websites-are-really-telling-you',
        href: 'hidden-data-what-websites-are-really-telling-you.html',
        title: 'Hidden Data - What Websites Are Really Telling You',
        image: '../content/insights/insight-04/insight-4-header.png',
        image_alt: 'Hidden Data - What Websites Are Really Telling You header image.',
        date: 'April 21, 2026',
        copy: 'The most valuable data is often the hardest to see. Discover how Google Analytics and Microsoft Clarity turn invisible user actions into something you can actually understand.',
    },
    {
        slug: 'i-built-my-portfolio-without-knowing-how-to-code-and-it-still-worked',
        href: 'i-built-my-portfolio-without-knowing-how-to-code-and-it-still-worked.html',
        title: 'I Built My Portfolio Without Knowing How to Code (And It Still Worked)',
        image: '../content/insights/insight-05/insight-5-header.png',
        image_alt: 'I Built My Portfolio Without Knowing How to Code (And It Still Worked) header image.',
        date: 'April 23, 2026',
        copy: 'A practical reflection on building this portfolio from zero coding experience using AI tools, GitHub Pages, and steady iteration instead of perfection.',
    },
];

const CAROUSEL_LAYOUT_CONFIG = {
    insights: {
        cardSelector: '.insight-card',
        gridClass: 'insights-card-grid',
    },
    projects: {
        cardSelector: '.project-carousel-card',
        gridClass: 'projects-carousel-grid',
    },
};

const chunkItems = (items, chunkSize) => {
    const chunks = [];

    for (let index = 0; index < items.length; index += chunkSize) {
        chunks.push(items.slice(index, index + chunkSize));
    }

    return chunks;
};

const renderProjectCard = (item) => `
    <article class="project-carousel-card">
        <div class="project-carousel-image">
            <img src="${item.image}" alt="${item.image_alt}">
        </div>
        <div class="project-carousel-body">
            <h3>${item.title}</h3>
            <p class="project-carousel-copy">${item.copy}</p>
            <ul class="project-carousel-list">
                ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <a class="project-carousel-link" href="${item.href}">View Project Case Study</a>
        </div>
    </article>
`;

const renderInsightCard = (item) => `
    <article class="insight-card">
        <a class="insight-card-link" href="${item.href}" aria-label="Read more about ${item.title.replace(/[()]/g, '')}">
            <div class="insight-card-image">
                <img src="${item.image}" alt="${item.image_alt}">
            </div>
            <div class="insight-card-body">
                <h3>${item.title}</h3>
                <p class="insight-card-date">${item.date}</p>
                <p class="insight-card-copy">${item.copy}</p>
                <span class="insight-read-more">Read More</span>
            </div>
        </a>
    </article>
`;

const renderRelatedSection = (section) => {
    const kind = section.dataset.relatedKind;
    const currentSlug = section.dataset.currentSlug;
    const items = kind === 'projects' ? PROJECT_ITEMS : INSIGHT_ITEMS;
    const headingLabel = kind === 'projects' ? 'Builds' : 'Insights';
    const headingTitle = kind === 'projects' ? 'More Projects' : 'More Insights';
    const shellClass = kind === 'projects' ? 'projects-carousel-shell' : 'insights-carousel-shell';
    const navClass = kind === 'projects' ? 'projects-carousel-nav' : 'insights-carousel-nav';
    const navPrevClass = kind === 'projects' ? 'projects-carousel-nav-prev' : 'insights-carousel-nav-prev';
    const navNextClass = kind === 'projects' ? 'projects-carousel-nav-next' : 'insights-carousel-nav-next';
    const trackClass = kind === 'projects' ? 'projects-carousel-track' : 'insights-carousel-track';
    const gridClass = kind === 'projects' ? 'projects-carousel-grid' : 'insights-card-grid';
    const desktopChunkSize = kind === 'projects' ? 2 : 3;
    const renderCard = kind === 'projects' ? renderProjectCard : renderInsightCard;
    const relatedItems = items.filter((item) => item.slug !== currentSlug);
    const slides = chunkItems(relatedItems, desktopChunkSize);
    const carouselName = `related-${kind}-${currentSlug}`;

    section.innerHTML = `
        <div class="section-heading section-heading-row">
            <div>
                <span class="section-kicker">${headingLabel}</span>
                <h2>${headingTitle}</h2>
            </div>
        </div>

        <div class="${shellClass}">
            <button class="carousel-button icon-carousel-button ${navClass} ${navPrevClass}" type="button" data-carousel-prev="${carouselName}" aria-label="Previous ${kind}">
                <img src="../assets/icons/left-arrow.svg" alt="" aria-hidden="true">
            </button>

            <div class="carousel-shell" data-carousel="${carouselName}" data-carousel-kind="${kind}">
                <div class="carousel-track ${trackClass}">
                    ${slides.map((slide, slideIndex) => `
                        <div class="carousel-card${slideIndex === 0 ? ' is-active' : ''}">
                            <div class="${gridClass}">
                                ${slide.map((item) => renderCard(item)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <button class="carousel-button icon-carousel-button ${navClass} ${navNextClass}" type="button" data-carousel-next="${carouselName}" aria-label="Next ${kind}">
                <img src="../assets/icons/right-arrow.svg" alt="" aria-hidden="true">
            </button>
        </div>
    `;
};

const initRelatedContent = () => {
    const relatedSections = [...document.querySelectorAll('[data-related-kind]')];
    relatedSections.forEach((section) => renderRelatedSection(section));
};

const syncResponsiveCarouselLayouts = (kind) => {
    const config = CAROUSEL_LAYOUT_CONFIG[kind];
    const shells = [...document.querySelectorAll(`[data-carousel-kind="${kind}"]`)];

    shells.forEach((shell) => {
        const track = shell.querySelector('.carousel-track');

        if (!track) {
            return;
        }

        if (!track.dataset.desktopMarkup) {
            track.dataset.desktopMarkup = track.innerHTML;
        }

        const shouldUseMobileLayout = isMobileCarouselViewport();
        const currentLayout = track.dataset.layoutMode || 'desktop';

        if (shouldUseMobileLayout && currentLayout !== 'mobile') {
            const temp = document.createElement('div');
            temp.innerHTML = track.dataset.desktopMarkup;

            const seenLinks = new Set();
            const cards = [...temp.querySelectorAll(config.cardSelector)].filter((card) => {
                const href = card.querySelector('a')?.getAttribute('href') || '';

                if (!href || seenLinks.has(href)) {
                    return false;
                }

                seenLinks.add(href);
                return true;
            });

            track.innerHTML = cards
                .map((card, cardIndex) => `
                    <div class="carousel-card${cardIndex === 0 ? ' is-active' : ''}">
                        <div class="${config.gridClass}">
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
    });
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
    syncResponsiveCarouselLayouts('insights');
    syncResponsiveCarouselLayouts('projects');
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

const initProjectImageLightbox = () => {
    if (page !== 'project-detail') {
        return;
    }

    const images = [...document.querySelectorAll('.project-simple-banner img, .project-simple-image img, .project-image-gallery img')];

    if (!images.length) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'project-image-lightbox';
    lightbox.setAttribute('hidden', '');
    lightbox.innerHTML = `
        <div class="project-image-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Project image preview">
            <button class="project-image-lightbox-close" type="button" aria-label="Close image preview">&times;</button>
            <img src="" alt="">
            <p class="project-image-lightbox-caption" hidden></p>
        </div>
    `;

    document.body.appendChild(lightbox);

    const dialog = lightbox.querySelector('.project-image-lightbox-dialog');
    const preview = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.project-image-lightbox-caption');
    const closeButton = lightbox.querySelector('.project-image-lightbox-close');

    const closeLightbox = () => {
        lightbox.setAttribute('hidden', '');
        preview.src = '';
        preview.alt = '';
        caption.textContent = '';
        caption.setAttribute('hidden', '');
        document.body.classList.remove('image-lightbox-open');
    };

    const openLightbox = (image) => {
        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt || '';

        if (image.alt) {
            caption.textContent = image.alt;
            caption.removeAttribute('hidden');
        } else {
            caption.textContent = '';
            caption.setAttribute('hidden', '');
        }

        lightbox.removeAttribute('hidden');
        document.body.classList.add('image-lightbox-open');
    };

    images.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `${image.alt || 'Project image'} - open full size preview`);

        image.addEventListener('click', () => openLightbox(image));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    dialog.addEventListener('click', (event) => event.stopPropagation());

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
            closeLightbox();
        }
    });
};

const TRIVIA_ROTATION_INTERVAL = 10 * 1000;

const shuffleTriviaItems = (items) => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
};

const initTrivia = () => {
    const triviaText = document.querySelector('[data-trivia-text]');

    if (!triviaText) {
        return;
    }

    const triviaItems = Array.isArray(window.CZ_TRIVIA_ITEMS) ? window.CZ_TRIVIA_ITEMS : [];

    if (!triviaItems.length) {
        return;
    }

    const prevButton = document.querySelector('[data-trivia-prev]');
    const nextButton = document.querySelector('[data-trivia-next]');
    let currentIndex = 0;
    let rotationIntervalId = null;

    const buildShuffledList = (previousItem = null) => {
        const shuffled = shuffleTriviaItems(triviaItems);

        if (previousItem && shuffled.length > 1 && shuffled[0]?.text === previousItem.text) {
            [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
        }

        return shuffled;
    };

    let shuffledItems = buildShuffledList();

    const renderTrivia = () => {
        const currentItem = shuffledItems[currentIndex];

        if (!currentItem?.text) {
            return;
        }

        triviaText.textContent = `\u201C${currentItem.text}\u201D`;
    };

    const restartRotationTimer = () => {
        if (rotationIntervalId) {
            window.clearInterval(rotationIntervalId);
        }

        rotationIntervalId = window.setInterval(() => {
            showNextTrivia();
        }, TRIVIA_ROTATION_INTERVAL);
    };

    const showNextTrivia = () => {
        if (!shuffledItems.length) {
            return;
        }

        const nextIndex = currentIndex + 1;

        if (nextIndex >= shuffledItems.length) {
            const previousItem = shuffledItems[currentIndex];
            shuffledItems = buildShuffledList(previousItem);
            currentIndex = 0;
        } else {
            currentIndex = nextIndex;
        }

        renderTrivia();
    };

    const showPreviousTrivia = () => {
        if (!shuffledItems.length) {
            return;
        }

        currentIndex = currentIndex - 1;

        if (currentIndex < 0) {
            currentIndex = shuffledItems.length - 1;
        }

        renderTrivia();
    };

    prevButton?.addEventListener('click', () => {
        showPreviousTrivia();
        restartRotationTimer();
    });

    nextButton?.addEventListener('click', () => {
        showNextTrivia();
        restartRotationTimer();
    });

    renderTrivia();
    restartRotationTimer();
};

// =========================
// GAME SWITCH (NEW)
// =========================

const initGameSwitch = () => {
    const cards = [...document.querySelectorAll('.game-card[data-game]')];
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

initRelatedContent();
initTheme();
initTrivia();
initGameSwitch();
initSectionSpy();
initTopbarSwap();
initCarousels();
initScrollTopButton();
initProjectImageLightbox();

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

