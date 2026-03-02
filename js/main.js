/* ================================================
   ToolsFast News Portal - Main Application
   Premium American English News Portal
   ================================================ */

const APP = {
    articles: [],
    currentPage: 1,
    loading: false,

    async init() {
        this.setupDate();
        this.setupHeader();
        this.setupSearch();
        this.setupBackToTop();

        await this.loadArticles();
        this.renderHomepage();

        ADS.init();

        // Auto-refresh every 5 minutes
        setInterval(() => this.refreshContent(), 300000);
    },

    setupDate() {
        const el = document.getElementById('headerDate');
        if (el) {
            const d = new Date();
            el.textContent = `${EN_DAYS[d.getDay()]}, ${EN_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        }
        const yr = document.getElementById('footerYear');
        if (yr) yr.textContent = new Date().getFullYear();
    },

    setupHeader() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('siteNav');
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('open');
                toggle.querySelector('i').className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            });
        }

        // Sticky header
        let lastY = 0;
        const header = document.getElementById('siteHeader');
        if (header) {
            window.addEventListener('scroll', () => {
                const y = window.scrollY;
                if (y > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                lastY = y;
            }, { passive: true });
        }
    },

    setupSearch() {
        const input = document.getElementById('searchInput');
        const btn = document.getElementById('searchBtn');
        if (input && btn) {
            const go = () => {
                const q = input.value.trim();
                if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
            };
            btn.addEventListener('click', go);
            input.addEventListener('keypress', e => { if (e.key === 'Enter') go(); });
        }
    },

    setupBackToTop() {
        const btn = document.getElementById('toTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    // Load articles from Table API
    async loadArticles() {
        try {
            const res = await fetch('tables/articles?limit=100&sort=-created_at');
            const data = await res.json();
            this.articles = data.data || [];
        } catch (e) {
            this.articles = this.getDemoArticles();
        }
    },

    getByCategory(cat, limit = 10) {
        return this.articles.filter(a => a.category === cat).slice(0, limit);
    },

    getFeatured(limit = 4) {
        return this.articles.filter(a => a.is_featured).slice(0, limit);
    },

    renderHomepage() {
        this.renderBreakingTicker();
        this.renderHeroSection();
        this.renderLatestNews();
        this.renderCategorySection('techList', 'technology', 5);
        this.renderCategorySection('financeList', 'finance', 5);
        this.renderWorldGrid();
        this.renderCategorySection('healthList', 'health', 5);
        this.renderCategorySection('scienceList', 'science', 5);
        this.renderTrending();
    },

    renderBreakingTicker() {
        const el = document.getElementById('breakingScroll');
        if (!el) return;
        const items = this.articles.filter(a => a.is_breaking).slice(0, 8);
        const display = items.length > 0 ? items : this.articles.slice(0, 6);
        el.innerHTML = display.map(a =>
            `<a href="article.html?id=${a.id}" class="ticker-link">${a.title}</a>`
        ).join('<span class="ticker-sep"></span>');
    },

    renderHeroSection() {
        const primary = document.getElementById('heroPrimary');
        const secondary = document.getElementById('heroSecondary');
        if (!primary || !secondary) return;

        const featured = this.getFeatured(4);
        const items = featured.length >= 4 ? featured : this.articles.slice(0, 4);

        if (items.length > 0) {
            const lead = items[0];
            const cat = getCategoryInfo(lead.category);
            primary.innerHTML = `
                <a href="article.html?id=${lead.id}" class="hero-lead">
                    <div class="hero-img-wrap">
                        <img src="${lead.image || getDefaultImage(lead.category)}" alt="${lead.title}" loading="eager">
                    </div>
                    <div class="hero-lead-content">
                        <span class="cat-label" style="--cat-color:${cat.color}">${cat.name}</span>
                        <h1 class="hero-headline">${lead.title}</h1>
                        <p class="hero-excerpt">${lead.excerpt || ''}</p>
                        <div class="hero-meta">
                            <span>${lead.author || 'ToolsFast Editorial'}</span>
                            <span>${timeAgo(lead.created_at || new Date().toISOString())}</span>
                            <span>${getReadTime(lead.word_count)}</span>
                        </div>
                    </div>
                </a>`;
        }

        const sides = items.slice(1, 4);
        secondary.innerHTML = sides.map(a => {
            const cat = getCategoryInfo(a.category);
            return `
                <a href="article.html?id=${a.id}" class="hero-side-card">
                    <img src="${a.image || getDefaultImage(a.category)}" alt="${a.title}" loading="lazy">
                    <div class="hero-side-overlay">
                        <span class="cat-label" style="--cat-color:${cat.color}">${cat.name}</span>
                        <h3>${a.title}</h3>
                        <span class="side-meta">${timeAgo(a.created_at || new Date().toISOString())}</span>
                    </div>
                </a>`;
        }).join('');
    },

    renderLatestNews() {
        const grid = document.getElementById('latestGrid');
        if (!grid) return;
        const latest = this.articles.slice(0, 8);
        grid.innerHTML = latest.map(a => this.createCard(a)).join('');
    },

    renderCategorySection(elId, category, limit) {
        const list = document.getElementById(elId);
        if (!list) return;
        let items = this.getByCategory(category, limit);
        if (items.length === 0) items = this.articles.slice(0, limit);
        list.innerHTML = items.map(a => this.createListItem(a)).join('');
    },

    renderWorldGrid() {
        const grid = document.getElementById('worldGrid');
        if (!grid) return;
        let items = this.getByCategory('world', 4).concat(this.getByCategory('politics', 4));
        const display = items.length > 0 ? items.slice(0, 4) : this.articles.slice(4, 8);
        grid.innerHTML = display.map(a => this.createCard(a)).join('');
    },

    renderTrending() {
        const grid = document.getElementById('trendingGrid');
        if (!grid) return;
        const trending = [...this.articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 8);
        grid.innerHTML = trending.map((a, i) => `
            <a href="article.html?id=${a.id}" class="trending-item">
                <span class="trending-rank">${String(i + 1).padStart(2, '0')}</span>
                <div class="trending-body">
                    <span class="trending-cat" style="color:${getCategoryInfo(a.category).color}">${getCategoryInfo(a.category).name}</span>
                    <h4 class="trending-title">${a.title}</h4>
                    <span class="trending-meta">${formatNumber(a.views || 0)} views</span>
                </div>
            </a>
        `).join('');
    },

    createCard(article) {
        const cat = getCategoryInfo(article.category);
        return `
            <a href="article.html?id=${article.id}" class="news-card">
                <div class="card-img">
                    <img src="${article.image || getDefaultImage(article.category)}" alt="${article.title}" loading="lazy">
                    <span class="cat-label" style="--cat-color:${cat.color}">${cat.name}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-headline">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt || ''}</p>
                    <div class="card-meta">
                        <span>${timeAgo(article.created_at || new Date().toISOString())}</span>
                        <span>${getReadTime(article.word_count)}</span>
                    </div>
                </div>
            </a>`;
    },

    createListItem(article) {
        const cat = getCategoryInfo(article.category);
        return `
            <a href="article.html?id=${article.id}" class="list-row">
                <div class="list-thumb">
                    <img src="${article.image || getDefaultImage(article.category)}" alt="${article.title}" loading="lazy">
                </div>
                <div class="list-info">
                    <h4 class="list-title">${article.title}</h4>
                    <div class="list-meta">
                        <span>${timeAgo(article.created_at || new Date().toISOString())}</span>
                        <span>${formatNumber(article.views || 0)} views</span>
                    </div>
                </div>
            </a>`;
    },

    async refreshContent() {
        await this.loadArticles();
        this.renderHomepage();
    },

    getDemoArticles() {
        const now = Date.now();
        return [
            {
                id: 'demo-1',
                title: 'Federal Reserve Signals Potential Rate Cut Amid Cooling Inflation Data',
                excerpt: 'The Federal Reserve indicated it may lower interest rates in the coming months as new economic data shows inflation trending closer to the central bank\'s two percent target.',
                category: 'finance',
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85',
                is_featured: true,
                is_breaking: true,
                views: 48200,
                word_count: 5400,
                author: 'Michael Chen',
                tags: ['federal reserve', 'interest rates', 'inflation', 'economy', 'monetary policy'],
                created_at: new Date(now - 1800000).toISOString()
            },
            {
                id: 'demo-2',
                title: 'Apple Unveils Next-Generation M5 Chip With Breakthrough AI Processing Capabilities',
                excerpt: 'Apple\'s newest silicon represents a fundamental leap in on-device artificial intelligence, delivering performance metrics that industry analysts describe as generation-defining.',
                category: 'technology',
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=85',
                is_featured: true,
                is_breaking: true,
                views: 35600,
                word_count: 5800,
                author: 'Sarah Mitchell',
                tags: ['apple', 'M5 chip', 'AI', 'silicon', 'technology'],
                created_at: new Date(now - 3600000).toISOString()
            },
            {
                id: 'demo-3',
                title: 'NATO Allies Reach Historic Defense Spending Agreement at Brussels Summit',
                excerpt: 'Alliance members committed to unprecedented defense expenditure targets in response to evolving security challenges across multiple theaters.',
                category: 'world',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85',
                is_featured: true,
                views: 29400,
                word_count: 5200,
                author: 'James Crawford',
                tags: ['NATO', 'defense', 'Europe', 'security', 'geopolitics'],
                created_at: new Date(now - 5400000).toISOString()
            },
            {
                id: 'demo-4',
                title: 'Supreme Court to Hear Landmark Case on Technology Company Liability for AI-Generated Content',
                excerpt: 'The highest court will consider whether artificial intelligence outputs fall under existing content moderation frameworks, a decision with sweeping implications for the technology sector.',
                category: 'politics',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=85',
                is_featured: true,
                views: 42100,
                word_count: 5600,
                author: 'Victoria Park',
                tags: ['supreme court', 'AI regulation', 'technology law', 'section 230'],
                created_at: new Date(now - 7200000).toISOString()
            },
            {
                id: 'demo-5',
                title: 'NASA Confirms Discovery of Organic Compounds on Europa That Could Indicate Biological Activity',
                excerpt: 'Data from the Europa Clipper mission has revealed complex organic molecules in the moon\'s subsurface ocean, marking a watershed moment in astrobiology research.',
                category: 'science',
                image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=85',
                views: 67800,
                word_count: 5100,
                author: 'Dr. Robert Ellis',
                tags: ['NASA', 'Europa', 'space exploration', 'astrobiology', 'organic compounds'],
                created_at: new Date(now - 10800000).toISOString()
            },
            {
                id: 'demo-6',
                title: 'Breakthrough Gene Therapy Shows 94 Percent Success Rate in Late-Stage Cancer Clinical Trials',
                excerpt: 'A revolutionary CAR-T cell therapy developed by a consortium of research hospitals demonstrated remarkable efficacy in treating previously untreatable solid tumors.',
                category: 'health',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85',
                views: 52300,
                word_count: 5300,
                author: 'Dr. Amanda Reeves',
                tags: ['gene therapy', 'cancer treatment', 'clinical trials', 'healthcare'],
                created_at: new Date(now - 14400000).toISOString()
            },
            {
                id: 'demo-7',
                title: 'NFL Draft 2026: Complete First-Round Analysis and Impact Projections for Every Selection',
                excerpt: 'Our comprehensive breakdown examines every first-round pick, projected starter timelines, and how each selection reshapes the competitive landscape heading into the season.',
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&q=85',
                views: 38900,
                word_count: 5700,
                author: 'Marcus Johnson',
                tags: ['NFL', 'draft', 'football', 'sports analysis', 'predictions'],
                created_at: new Date(now - 18000000).toISOString()
            },
            {
                id: 'demo-8',
                title: 'OpenAI Releases GPT-5 With Reasoning Capabilities That Rival Expert-Level Human Analysis',
                excerpt: 'The latest iteration of the GPT model family introduces chain-of-thought reasoning that benchmark tests show performs at or above the level of domain experts across multiple fields.',
                category: 'ai',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
                views: 81200,
                word_count: 5500,
                author: 'Daniel Foster',
                tags: ['OpenAI', 'GPT-5', 'artificial intelligence', 'machine learning'],
                created_at: new Date(now - 21600000).toISOString()
            },
            {
                id: 'demo-9',
                title: 'Global Stock Markets Rally as Trade Negotiations Between U.S. and China Yield New Framework',
                excerpt: 'Equity markets across Asia, Europe, and North America surged after negotiators announced a comprehensive framework addressing tariffs, technology transfers, and market access.',
                category: 'finance',
                image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=85',
                views: 31500,
                word_count: 5000,
                author: 'Elizabeth Warren',
                tags: ['stock market', 'trade war', 'US China', 'investing', 'global markets'],
                created_at: new Date(now - 25200000).toISOString()
            },
            {
                id: 'demo-10',
                title: 'Tesla Announces Full Self-Driving Achieved Level 5 Autonomy Certification in United States',
                excerpt: 'The National Highway Traffic Safety Administration granted the first-ever Level 5 autonomous driving certification, allowing Tesla vehicles to operate without any human supervision.',
                category: 'technology',
                image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=85',
                views: 56400,
                word_count: 5400,
                author: 'Kevin Rodriguez',
                tags: ['Tesla', 'autonomous driving', 'self-driving', 'NHTSA', 'electric vehicles'],
                created_at: new Date(now - 28800000).toISOString()
            },
            {
                id: 'demo-11',
                title: 'Premier League Title Race Reaches Dramatic Conclusion With Three Teams Level on Points',
                excerpt: 'The most competitive season in Premier League history enters its final matchday with three clubs mathematically capable of lifting the trophy.',
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85',
                views: 44700,
                word_count: 5200,
                author: 'Thomas Wright',
                tags: ['Premier League', 'soccer', 'football', 'championship', 'sports'],
                created_at: new Date(now - 32400000).toISOString()
            },
            {
                id: 'demo-12',
                title: 'Climate Scientists Report Accelerated Greenland Ice Sheet Melting Could Raise Sea Levels by Two Feet',
                excerpt: 'New satellite data reveals Greenland is losing ice mass at rates forty percent faster than previous models predicted, with significant implications for coastal infrastructure worldwide.',
                category: 'science',
                image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=85',
                views: 23800,
                word_count: 5100,
                author: 'Dr. Patricia Neal',
                tags: ['climate change', 'Greenland', 'sea level', 'environment', 'science'],
                created_at: new Date(now - 36000000).toISOString()
            }
        ];
    }
};

document.addEventListener('DOMContentLoaded', () => APP.init());
