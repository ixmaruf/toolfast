/* ================================================
   ToolsFast News Portal - SEO Engine
   LSI Keyword Generation, Structured Data, Meta Injection
   ================================================ */

const SEO = {

    // Master LSI keyword database organized by vertical
    lsiDatabase: {
        technology: [
            'artificial intelligence applications','machine learning algorithms','cloud computing infrastructure',
            'cybersecurity threat detection','blockchain technology adoption','quantum computing research',
            'semiconductor chip manufacturing','5G network deployment','Internet of Things devices',
            'edge computing solutions','software as a service','digital transformation strategy',
            'augmented reality experiences','virtual reality headsets','autonomous vehicle technology',
            'robotic process automation','natural language processing','computer vision systems',
            'data analytics platforms','enterprise software solutions','mobile app development',
            'open source software','tech industry regulations','startup funding rounds',
            'venture capital investments','silicon valley innovation','tech company earnings',
            'consumer electronics market','wearable technology trends','smart home automation',
            'drone technology commercial','3D printing manufacturing','tech talent acquisition',
            'remote work technology','video conferencing platforms','digital payments ecosystem',
            'fintech disruption banking','regtech compliance solutions','insurtech innovation',
            'edtech learning platforms','healthtech telemedicine','proptech real estate',
            'agritech precision farming','cleantech renewable energy','deeptech research development'
        ],
        finance: [
            'stock market volatility','federal reserve interest rates','inflation rate impact',
            'cryptocurrency market analysis','bitcoin price prediction','ethereum blockchain updates',
            'bond yield curve','treasury bills returns','mutual fund performance',
            'exchange traded funds','hedge fund strategies','private equity investments',
            'real estate investment trusts','commercial mortgage rates','residential mortgage refinance',
            'auto loan interest rates','student loan refinancing','personal loan comparison',
            'credit score improvement','debt consolidation options','bankruptcy filing process',
            'tax deduction strategies','capital gains tax rates','estate tax planning',
            'retirement savings accounts','401k contribution limits','IRA rollover rules',
            'social security benefits','pension fund management','annuity investment options',
            'life insurance premiums','health insurance marketplace','auto insurance discounts',
            'homeowners insurance coverage','umbrella liability policy','workers compensation claims',
            'mesothelioma legal compensation','structured settlement payments','forex trading strategies',
            'commodity futures trading','options trading basics','day trading regulations',
            'wealth management services','financial planning advisors','robo advisor platforms',
            'banking sector performance','fintech company valuations','payment processing fees'
        ],
        health: [
            'clinical trial results','pharmaceutical drug approval','vaccine development timeline',
            'mental health awareness','anxiety treatment options','depression therapy approaches',
            'telemedicine consultation','remote patient monitoring','digital health records',
            'cancer research breakthroughs','immunotherapy treatment','gene therapy advances',
            'cardiovascular disease prevention','diabetes management','obesity treatment programs',
            'nutrition science research','dietary supplement regulation','organic food benefits',
            'fitness training programs','sports medicine advances','physical therapy techniques',
            'sleep disorder treatment','chronic pain management','addiction recovery programs',
            'pediatric healthcare','geriatric medicine advances','women health screening',
            'men health awareness','rare disease treatment','orphan drug development',
            'medical device innovation','surgical robot technology','prosthetic limb advances',
            'dental implant procedures','vision correction surgery','hearing aid technology',
            'health insurance premiums','medicare advantage plans','medicaid expansion states',
            'prescription drug pricing','generic medication availability','pharmacy benefit managers',
            'public health emergency','infectious disease outbreak','epidemiology research',
            'global health initiatives','WHO recommendations','CDC guidelines updates'
        ],
        politics: [
            'presidential election polls','congressional legislation','supreme court decisions',
            'executive order analysis','bipartisan policy agreement','filibuster reform debate',
            'campaign finance reform','voter registration laws','electoral college system',
            'immigration policy changes','border security measures','asylum seeker processing',
            'gun control legislation','second amendment rights','background check requirements',
            'healthcare reform proposals','affordable care act','single payer healthcare',
            'climate change policy','environmental regulations','clean energy legislation',
            'foreign policy decisions','diplomatic relations','trade agreement negotiations',
            'defense spending budget','military deployment overseas','veterans affairs funding',
            'education policy reform','student debt relief','school choice programs',
            'criminal justice reform','police reform measures','prison system changes',
            'social security reform','minimum wage increase','labor union negotiations',
            'antitrust enforcement','tech company regulation','data privacy legislation',
            'infrastructure spending','transportation funding','broadband access expansion',
            'state government policies','governor executive actions','local election results',
            'political party strategy','polling data analysis','campaign trail updates'
        ],
        science: [
            'space exploration missions','Mars colonization plans','asteroid mining potential',
            'James Webb telescope discoveries','satellite technology advances','rocket propulsion systems',
            'climate change research','global temperature records','sea level rise projections',
            'renewable energy research','solar panel efficiency','wind turbine technology',
            'nuclear fusion progress','hydrogen fuel cells','carbon capture technology',
            'biodiversity conservation','endangered species protection','deforestation monitoring',
            'ocean acidification effects','coral reef restoration','marine biology discoveries',
            'genetics research CRISPR','stem cell therapy','bioengineering advances',
            'neuroscience discoveries','brain mapping projects','consciousness research',
            'particle physics experiments','dark matter detection','gravitational wave observation',
            'materials science innovation','nanotechnology applications','superconductor research',
            'archaeology discoveries','paleontology findings','anthropology studies',
            'geological survey results','earthquake prediction','volcanic activity monitoring',
            'weather pattern analysis','hurricane forecasting','drought condition assessment',
            'agricultural science','crop yield improvement','soil health research'
        ],
        sports: [
            'NFL playoff predictions','Super Bowl championship','quarterback performance stats',
            'NBA season standings','basketball trade rumors','draft pick analysis',
            'MLB World Series','baseball free agency','pitching statistics leaders',
            'NHL Stanley Cup','hockey trade deadline','goaltender save percentage',
            'Premier League standings','Champions League results','transfer window signings',
            'FIFA World Cup qualifying','international soccer','player contract negotiations',
            'UFC fight results','boxing championship','MMA fighter rankings',
            'tennis Grand Slam','golf major tournaments','PGA Tour standings',
            'Olympic Games preparation','track and field records','swimming world records',
            'NASCAR race results','Formula One standings','motorsport technology',
            'college football rankings','NCAA basketball tournament','athletic scholarship offers',
            'sports betting odds','fantasy football advice','sports analytics metrics',
            'athlete injury updates','sports medicine advances','performance enhancement testing',
            'stadium construction','franchise relocation','sports broadcast rights',
            'esports tournament results','gaming competition','streaming platform deals'
        ],
        world: [
            'geopolitical tension analysis','international trade disputes','sanctions enforcement',
            'United Nations resolutions','NATO alliance strategy','European Union policies',
            'Middle East peace process','Asia Pacific security','Africa development initiatives',
            'Latin America governance','Arctic territorial claims','South China Sea disputes',
            'nuclear nonproliferation','arms control treaties','defense cooperation agreements',
            'refugee crisis response','humanitarian aid delivery','disaster relief operations',
            'global economic outlook','emerging market growth','developing nation progress',
            'international law enforcement','Interpol operations','cross border crime',
            'diplomatic summit outcomes','bilateral relations','multilateral negotiations',
            'cultural exchange programs','international education','global tourism recovery',
            'pandemic preparedness','global supply chain','commodity price fluctuations',
            'energy security concerns','oil production quotas','natural gas pipeline projects',
            'technology export controls','intellectual property rights','cyber warfare threats',
            'election monitoring missions','democratic governance','human rights investigations',
            'climate change summit','environmental agreement','sustainability initiatives'
        ],
        ai: [
            'large language models','generative AI applications','neural network architecture',
            'deep learning research','reinforcement learning','transfer learning techniques',
            'AI ethics governance','algorithmic bias detection','responsible AI development',
            'AI regulation framework','autonomous systems safety','AI workforce displacement',
            'natural language generation','text to image models','voice synthesis technology',
            'computer vision advances','facial recognition policy','object detection systems',
            'AI chip development','GPU computing performance','edge AI deployment',
            'AI healthcare diagnostics','drug discovery AI','medical imaging analysis',
            'AI financial trading','fraud detection algorithms','credit scoring models',
            'AI education tools','personalized learning','intelligent tutoring systems',
            'AI creative tools','music generation','video editing automation',
            'robotics advancement','humanoid robots','industrial automation AI',
            'AI research papers','benchmark performance','open source AI models',
            'AI startup ecosystem','venture capital AI','enterprise AI adoption',
            'multimodal AI systems','AI agent frameworks','AI safety research'
        ]
    },

    // Generate 5000 LSI keywords for an article
    generateLSIKeywords(title, content, category, tags) {
        const keywords = new Set();
        const textContent = (title + ' ' + (content || '') + ' ' + (tags || []).join(' ')).toLowerCase();
        const words = textContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 3);

        // 1. Category-specific LSI keywords
        const catKeywords = this.lsiDatabase[category] || [];
        catKeywords.forEach(kw => keywords.add(kw));

        // 2. Cross-category related keywords
        Object.keys(this.lsiDatabase).forEach(cat => {
            if (cat !== category) {
                const related = this.lsiDatabase[cat].filter(kw => {
                    const kwWords = kw.toLowerCase().split(' ');
                    return kwWords.some(w => words.includes(w));
                });
                related.forEach(kw => keywords.add(kw));
            }
        });

        // 3. Generate n-gram keyword combinations
        const significantWords = this.extractSignificantWords(words);
        for (let i = 0; i < significantWords.length; i++) {
            for (let j = i + 1; j < Math.min(i + 4, significantWords.length); j++) {
                keywords.add(significantWords[i] + ' ' + significantWords[j]);
                if (j + 1 < significantWords.length) {
                    keywords.add(significantWords[i] + ' ' + significantWords[j] + ' ' + significantWords[j + 1]);
                }
            }
        }

        // 4. High-CPC keyword injection
        const cpcCategories = ['finance', 'health', 'legal', 'technology'];
        cpcCategories.forEach(cat => {
            const cpcKws = CONFIG.highCPCKeywords[cat] || [];
            cpcKws.forEach(kw => keywords.add(kw));
        });

        // 5. Trending variations
        const variations = this.generateVariations(Array.from(keywords).slice(0, 500));
        variations.forEach(v => keywords.add(v));

        // 6. Long-tail keyword generation
        const longTail = this.generateLongTailKeywords(title, category);
        longTail.forEach(kw => keywords.add(kw));

        // Cap at 5000
        return Array.from(keywords).slice(0, CONFIG.seo.maxLSIKeywordsPerArticle);
    },

    extractSignificantWords(words) {
        const stopWords = new Set([
            'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
            'from','up','about','into','over','after','is','are','was','were','be','been',
            'being','have','has','had','do','does','did','will','would','could','should',
            'may','might','shall','can','need','dare','ought','used','this','that','these',
            'those','i','me','my','myself','we','our','ours','you','your','he','him','his',
            'she','her','it','its','they','them','their','what','which','who','whom','when',
            'where','why','how','all','each','every','both','few','more','most','other',
            'some','such','no','nor','not','only','own','same','so','than','too','very',
            'just','also','now','then','here','there','when','where','while','although'
        ]);

        const freq = {};
        words.forEach(w => {
            const clean = w.replace(/[^a-z]/g, '');
            if (clean.length > 3 && !stopWords.has(clean)) {
                freq[clean] = (freq[clean] || 0) + 1;
            }
        });

        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 100)
            .map(([word]) => word);
    },

    generateVariations(keywords) {
        const prefixes = ['best', 'top', 'latest', 'new', 'how to', 'what is', 'guide to', 'understanding'];
        const suffixes = ['2026', 'guide', 'review', 'comparison', 'analysis', 'explained', 'overview', 'update'];
        const variations = [];

        keywords.slice(0, 200).forEach(kw => {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            variations.push(`${prefix} ${kw}`);
            variations.push(`${kw} ${suffix}`);
        });

        return variations;
    },

    generateLongTailKeywords(title, category) {
        const patterns = [
            'what you need to know about {topic}',
            'everything you should know about {topic}',
            'how {topic} affects the economy',
            'why {topic} matters for investors',
            '{topic} impact on stock market',
            '{topic} latest developments today',
            'breaking news {topic} updates',
            '{topic} expert analysis 2026',
            'how to prepare for {topic}',
            '{topic} implications for businesses'
        ];

        const topicWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 4).slice(0, 5);
        const results = [];

        topicWords.forEach(word => {
            patterns.forEach(pattern => {
                results.push(pattern.replace('{topic}', word));
            });
        });

        return results;
    },

    // Inject LSI keywords into page metadata
    injectKeywordMeta(keywords) {
        // Hidden meta keywords
        let metaKw = document.querySelector('meta[name="keywords"]');
        if (!metaKw) {
            metaKw = document.createElement('meta');
            metaKw.name = 'keywords';
            document.head.appendChild(metaKw);
        }
        metaKw.content = keywords.slice(0, 500).join(', ');

        // Hidden keyword data attribute on body for search engines
        document.body.setAttribute('data-keywords', keywords.slice(0, 1000).join(','));

        // Inject as hidden structured data
        let kwScript = document.getElementById('lsi-keywords-data');
        if (!kwScript) {
            kwScript = document.createElement('script');
            kwScript.id = 'lsi-keywords-data';
            kwScript.type = 'application/ld+json';
            document.head.appendChild(kwScript);
        }
        kwScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'keywords': keywords.slice(0, 2000).join(', ')
        });
    },

    // Update page meta tags
    updateMeta(title, description, keywords, image, url) {
        document.title = title + ' - ToolsFast';

        const setMeta = (name, content, isProp) => {
            const attr = isProp ? 'property' : 'name';
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        setMeta('description', description);
        if (keywords) setMeta('keywords', keywords);
        setMeta('author', 'ToolsFast Editorial');
        setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Open Graph
        setMeta('og:title', title, true);
        setMeta('og:description', description, true);
        setMeta('og:type', 'article', true);
        setMeta('og:site_name', 'ToolsFast', true);
        setMeta('og:locale', 'en_US', true);
        if (image) setMeta('og:image', image, true);
        if (url) {
            setMeta('og:url', url, true);
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = url;
        }

        // Twitter Cards
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', title);
        setMeta('twitter:description', description);
        if (image) setMeta('twitter:image', image);

        // Hreflang tags
        CONFIG.seo.hreflangTags.forEach(lang => {
            let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
            if (!hreflang) {
                hreflang = document.createElement('link');
                hreflang.rel = 'alternate';
                hreflang.hreflang = lang;
                hreflang.href = url || window.location.href;
                document.head.appendChild(hreflang);
            }
        });
    },

    // Generate NewsArticle structured data
    generateArticleSchema(article) {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            'headline': article.title,
            'description': article.excerpt || article.title,
            'image': [article.image || getDefaultImage(article.category)],
            'datePublished': article.published_at || article.created_at,
            'dateModified': article.updated_at || article.created_at,
            'author': [{
                '@type': 'Person',
                'name': article.author || 'ToolsFast Editorial',
                'url': CONFIG.siteUrl + '/about.html'
            }],
            'publisher': {
                '@type': 'Organization',
                'name': 'ToolsFast',
                'logo': {
                    '@type': 'ImageObject',
                    'url': CONFIG.siteUrl + '/images/logo.png'
                }
            },
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': CONFIG.siteUrl + '/article.html?id=' + article.id
            },
            'keywords': (article.tags || []).join(', '),
            'articleSection': getCategoryInfo(article.category).name,
            'wordCount': article.word_count || 5000,
            'inLanguage': 'en-US',
            'isAccessibleForFree': true
        };

        let el = document.getElementById('article-schema');
        if (!el) {
            el = document.createElement('script');
            el.id = 'article-schema';
            el.type = 'application/ld+json';
            document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(schema);
    },

    // Generate BreadcrumbList structured data
    generateBreadcrumbSchema(items) {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items.map((item, i) => ({
                '@type': 'ListItem',
                'position': i + 1,
                'name': item.name,
                'item': item.url
            }))
        };

        let el = document.getElementById('breadcrumb-schema');
        if (!el) {
            el = document.createElement('script');
            el.id = 'breadcrumb-schema';
            el.type = 'application/ld+json';
            document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(schema);
    },

    // Generate excerpt from content
    generateExcerpt(content, maxLength = 160) {
        const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    },

    // Start live keyword listener (updates every minute)
    startKeywordListener(article) {
        if (!article) return;
        const updateKeywords = () => {
            const freshKeywords = this.generateLSIKeywords(
                article.title,
                article.content || '',
                article.category,
                article.tags
            );
            this.injectKeywordMeta(freshKeywords);
        };

        updateKeywords();
        setInterval(updateKeywords, CONFIG.seo.keywordUpdateIntervalMs);
    }
};
