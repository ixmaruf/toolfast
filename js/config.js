/* ================================================
   ToolsFast News Portal - Configuration
   Premium American English News for US/UK Audiences
   ================================================ */

const CONFIG = {
    siteName: 'ToolsFast',
    siteUrl: 'https://toolsfast.online',
    siteLogo: 'images/logo.png',
    siteDescription: 'Breaking news, investigative reporting, and expert analysis across technology, world affairs, finance, politics, and science.',
    language: 'en-US',
    targetRegions: ['US', 'GB', 'CA', 'AU'],

    categories: {
        world: {
            name: 'World',
            slug: 'world',
            icon: 'fas fa-globe-americas',
            color: '#1A73E8',
            description: 'Global affairs, international relations, and geopolitics'
        },
        technology: {
            name: 'Technology',
            slug: 'technology',
            icon: 'fas fa-microchip',
            color: '#0D47A1',
            description: 'Innovation, gadgets, software, and digital transformation'
        },
        finance: {
            name: 'Finance',
            slug: 'finance',
            icon: 'fas fa-chart-line',
            color: '#2E7D32',
            description: 'Markets, investing, banking, insurance, and economic analysis'
        },
        politics: {
            name: 'Politics',
            slug: 'politics',
            icon: 'fas fa-landmark',
            color: '#C62828',
            description: 'U.S. politics, elections, policy, and governance'
        },
        science: {
            name: 'Science',
            slug: 'science',
            icon: 'fas fa-flask',
            color: '#6A1B9A',
            description: 'Research, space, environment, and scientific breakthroughs'
        },
        health: {
            name: 'Health',
            slug: 'health',
            icon: 'fas fa-heartbeat',
            color: '#00838F',
            description: 'Healthcare, medicine, wellness, and public health'
        },
        sports: {
            name: 'Sports',
            slug: 'sports',
            icon: 'fas fa-football-ball',
            color: '#E65100',
            description: 'NFL, NBA, MLB, soccer, and global sports coverage'
        },
        ai: {
            name: 'AI and Innovation',
            slug: 'ai',
            icon: 'fas fa-robot',
            color: '#4A148C',
            description: 'Artificial intelligence, machine learning, and emerging tech'
        }
    },

    // High-CPC keyword clusters for US/UK traffic
    highCPCKeywords: {
        finance: [
            'best life insurance policies 2026', 'high yield savings account rates',
            'mortgage refinance rates today', 'business loan interest rates',
            'best credit cards for cashback', 'cryptocurrency investment strategy',
            'stock market analysis today', 'retirement planning guide',
            'tax filing tips 2026', 'commercial real estate investing',
            'forex trading platforms', 'personal injury settlement',
            'mesothelioma attorney compensation', 'structured settlement buyers',
            'auto insurance comparison rates', 'home equity loan rates'
        ],
        technology: [
            'best cloud hosting providers', 'enterprise cybersecurity solutions',
            'managed IT services pricing', 'SaaS platform comparison',
            'best VPN services 2026', 'data recovery services near me',
            'ERP software for small business', 'CRM platform reviews',
            'web hosting comparison', 'best antivirus software'
        ],
        health: [
            'best health insurance plans', 'online therapy platforms',
            'prescription drug costs comparison', 'telemedicine services',
            'dental implant costs', 'Medicare supplement plans',
            'addiction treatment centers', 'weight loss programs that work',
            'best hearing aids 2026', 'laser eye surgery costs'
        ],
        legal: [
            'personal injury lawyer consultation', 'wrongful death attorney',
            'workers compensation claim', 'medical malpractice lawsuit',
            'DUI attorney near me', 'bankruptcy lawyer fees',
            'estate planning attorney', 'immigration lawyer consultation'
        ]
    },

    // News API sources (RSS feeds and public APIs)
    newsSources: {
        technology: [
            { name: 'TechCrunch', feed: 'https://techcrunch.com/feed/' },
            { name: 'The Verge', feed: 'https://www.theverge.com/rss/index.xml' },
            { name: 'Ars Technica', feed: 'https://feeds.arstechnica.com/arstechnica/index' },
            { name: 'Wired', feed: 'https://www.wired.com/feed/rss' },
            { name: 'Engadget', feed: 'https://www.engadget.com/rss.xml' },
            { name: 'MIT Technology Review', feed: 'https://www.technologyreview.com/feed/' }
        ],
        world: [
            { name: 'Reuters', feed: 'https://feeds.reuters.com/reuters/worldNews' },
            { name: 'AP News', feed: 'https://rsshub.app/apnews/topics/apf-topnews' },
            { name: 'BBC World', feed: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
            { name: 'Al Jazeera', feed: 'https://www.aljazeera.com/xml/rss/all.xml' },
            { name: 'The Guardian', feed: 'https://www.theguardian.com/world/rss' }
        ],
        finance: [
            { name: 'Bloomberg', feed: 'https://feeds.bloomberg.com/markets/news.rss' },
            { name: 'CNBC', feed: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
            { name: 'Financial Times', feed: 'https://www.ft.com/?format=rss' },
            { name: 'MarketWatch', feed: 'https://feeds.marketwatch.com/marketwatch/topstories/' },
            { name: 'Wall Street Journal', feed: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' }
        ],
        politics: [
            { name: 'Politico', feed: 'https://www.politico.com/rss/politicopicks.xml' },
            { name: 'The Hill', feed: 'https://thehill.com/feed/' },
            { name: 'CNN Politics', feed: 'http://rss.cnn.com/rss/cnn_allpolitics.rss' },
            { name: 'NPR Politics', feed: 'https://feeds.npr.org/1014/rss.xml' }
        ],
        science: [
            { name: 'NASA', feed: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
            { name: 'Nature', feed: 'https://www.nature.com/nature.rss' },
            { name: 'Science Daily', feed: 'https://www.sciencedaily.com/rss/all.xml' },
            { name: 'Space.com', feed: 'https://www.space.com/feeds/all' }
        ],
        health: [
            { name: 'WebMD', feed: 'https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC' },
            { name: 'Medical News Today', feed: 'https://www.medicalnewstoday.com/newsfeeds/rss' },
            { name: 'NIH News', feed: 'https://www.nih.gov/news-events/news-releases/feed' }
        ],
        sports: [
            { name: 'ESPN', feed: 'https://www.espn.com/espn/rss/news' },
            { name: 'Sports Illustrated', feed: 'https://www.si.com/rss/si_topstories.rss' },
            { name: 'CBS Sports', feed: 'https://www.cbssports.com/rss/headlines/' },
            { name: 'Bleacher Report', feed: 'https://bleacherreport.com/articles/feed' }
        ]
    },

    // Ad configuration
    ads: {
        adsense: {
            enabled: true,
            publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
            slots: {
                headerBanner: 'XXXXXXXXXX',
                inArticle2: 'XXXXXXXXXX',
                inArticle5: 'XXXXXXXXXX',
                stickyFooter: 'XXXXXXXXXX',
                sidebarTop: 'XXXXXXXXXX'
            }
        },
        ezoic: {
            enabled: false,
            siteId: '',
            placeholders: ['ezoic-pub-ad-placeholder-101', 'ezoic-pub-ad-placeholder-102']
        },
        mediaNet: {
            enabled: false,
            customerId: '',
            widgetId: ''
        },
        placements: {
            headerBanner:  { size: '728x90',  mobileSize: '320x100', position: 'above-fold' },
            nativeAfter2:  { size: '336x280', mobileSize: '300x250', position: 'in-content' },
            engageAfter5:  { size: '336x280', mobileSize: '300x250', position: 'in-content' },
            stickyMobile:  { size: '320x50',  position: 'footer-sticky' },
            sidebarTop:    { size: '300x250', position: 'sidebar' }
        },
        maxAdsPerArticle: 5,
        minParagraphsBetweenAds: 3
    },

    // SEO configuration
    seo: {
        maxLSIKeywordsPerArticle: 5000,
        keywordUpdateIntervalMs: 60000,
        viralUpdateIntervalMs: 300000,
        autoGenerateLSI: true,
        structuredDataEnabled: true,
        openGraphEnabled: true,
        twitterCardsEnabled: true,
        hreflangTags: ['en-US', 'en-GB']
    },

    // Content settings
    content: {
        minWordsPerArticle: 5000,
        maxWordsPerArticle: 6000,
        articlesPerDay: { min: 5, max: 20 },
        imageDeleteAfterDays: 45,
        keepTextForever: true,
        articleStructure: [
            'introduction',
            'background',
            'analysis',
            'expert_opinions',
            'market_impact',
            'outlook',
            'conclusion'
        ]
    },

    // Default high-quality images from Unsplash (HD)
    defaultImages: {
        world: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85',
        technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
        finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85',
        politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85',
        science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=85',
        health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85',
        sports: 'https://images.unsplash.com/photo-1461896836934-bd45ba9ce77a?w=1200&q=85',
        ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
        default: 'https://images.unsplash.com/photo-1504711434969-e33886168d7c?w=1200&q=85'
    },

    // Automation timing
    automation: {
        checkIntervalMinutes: 1,
        publishIntervalMinutes: 60,
        seoUpdateIntervalMinutes: 5,
        viralFocusThreshold: 5000,
        peakHours: [6, 7, 8, 9, 12, 13, 17, 18, 19, 20, 21],
        postingSchedule: {
            morning: { start: 6, end: 10, count: 6 },
            midday:  { start: 11, end: 14, count: 4 },
            evening: { start: 17, end: 22, count: 8 }
        }
    }
};

// English date/time helpers
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EN_MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${EN_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return `${EN_MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function timeAgo(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    const diff = Math.floor((now - d) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) {
        const m = Math.floor(diff / 60);
        return m === 1 ? '1 minute ago' : `${m} minutes ago`;
    }
    if (diff < 86400) {
        const h = Math.floor(diff / 3600);
        return h === 1 ? '1 hour ago' : `${h} hours ago`;
    }
    if (diff < 604800) {
        const d2 = Math.floor(diff / 86400);
        return d2 === 1 ? '1 day ago' : `${d2} days ago`;
    }
    return formatDateShort(dateStr);
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString('en-US');
}

function getCategoryInfo(catId) {
    return CONFIG.categories[catId] || {
        name: catId.charAt(0).toUpperCase() + catId.slice(1),
        slug: catId,
        icon: 'fas fa-newspaper',
        color: '#333'
    };
}

function getDefaultImage(category) {
    return CONFIG.defaultImages[category] || CONFIG.defaultImages.default;
}

function getReadTime(wordCount) {
    const minutes = Math.ceil((wordCount || 2500) / 250);
    return `${minutes} min read`;
}
