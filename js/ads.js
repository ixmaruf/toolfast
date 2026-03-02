/* ================================================
   ToolsFast News Portal - Ad Management System
   Google AdSense, Ezoic, Media.net Integration
   ================================================ */

const ADS = {
    initialized: false,
    impressions: {},

    init() {
        if (this.initialized) return;
        this.initialized = true;
        this.loadAdNetworks();
        this.setupAdSlots();
        this.setupStickyAd();
        this.observeViewability();
    },

    // Load ad network scripts
    loadAdNetworks() {
        const config = CONFIG.ads;

        // Google AdSense
        if (config.adsense.enabled && config.adsense.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsense.publisherId}`;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }

        // Ezoic
        if (config.ezoic.enabled && config.ezoic.siteId) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.ezojs.com/ezoic/sa.min.js`;
            document.head.appendChild(script);
        }

        // Media.net
        if (config.mediaNet.enabled && config.mediaNet.customerId) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://contextual.media.net/dmedianet.js?cid=${config.mediaNet.customerId}`;
            document.head.appendChild(script);
        }
    },

    // Setup all ad slots found on the page
    setupAdSlots() {
        const slots = document.querySelectorAll('[data-ad-slot]');
        slots.forEach(slot => {
            const slotName = slot.getAttribute('data-ad-slot');
            const slotSize = slot.getAttribute('data-ad-size');
            this.renderAd(slot, slotName, slotSize);
        });
    },

    // Render an individual ad unit
    renderAd(container, slotName, size) {
        if (!container) return;
        const config = CONFIG.ads;

        // Try Google AdSense first
        if (config.adsense.enabled && config.adsense.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
            this.renderAdSense(container, slotName);
            return;
        }

        // Try Ezoic
        if (config.ezoic.enabled && config.ezoic.siteId) {
            this.renderEzoic(container, slotName);
            return;
        }

        // Try Media.net
        if (config.mediaNet.enabled && config.mediaNet.customerId) {
            this.renderMediaNet(container, slotName, size);
            return;
        }

        // Placeholder for development
        this.renderPlaceholder(container, slotName, size);
    },

    renderAdSense(container, slotName) {
        const config = CONFIG.ads.adsense;
        const slotId = config.slots[slotName] || '';

        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', config.publisherId);
        ins.setAttribute('data-ad-slot', slotId);
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');
        container.appendChild(ins);

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { /* AdSense not loaded */ }
    },

    renderEzoic(container, slotName) {
        const div = document.createElement('div');
        div.id = `ezoic-pub-ad-placeholder-${slotName}`;
        div.className = 'ezoic-ad';
        container.appendChild(div);
    },

    renderMediaNet(container, slotName, size) {
        const config = CONFIG.ads.mediaNet;
        const div = document.createElement('div');
        div.id = `media-net-${slotName}`;
        div.setAttribute('data-crid', config.widgetId);
        div.setAttribute('data-ctype', 'async');
        container.appendChild(div);
    },

    renderPlaceholder(container, slotName, size) {
        const [w, h] = (size || '728x90').split('x');
        const placeholder = document.createElement('div');
        placeholder.className = 'ad-placeholder-inner';
        placeholder.style.cssText = `
            width: 100%;
            max-width: ${w}px;
            min-height: ${h}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f5f5;
            border: 1px dashed #ddd;
            border-radius: 6px;
            margin: 0 auto;
            color: #aaa;
            font-size: 0.75rem;
            font-family: 'Inter', sans-serif;
        `;
        placeholder.innerHTML = `
            <div style="text-align:center;padding:12px;">
                <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;opacity:0.6;">Advertisement</div>
                <div style="font-size:0.7rem;opacity:0.4;">${size || 'Responsive'}</div>
            </div>
        `;
        container.appendChild(placeholder);
    },

    // Insert ads into article content body
    insertInArticleAds(contentEl) {
        if (!contentEl) return;
        const paragraphs = contentEl.querySelectorAll('p, .article-section-block');
        const config = CONFIG.ads;
        let adsInserted = 0;

        // Native ad after 2nd paragraph
        if (paragraphs.length > 2 && adsInserted < config.maxAdsPerArticle) {
            const ad = this.createInArticleAd('nativeAfter2', config.placements.nativeAfter2.size, 'native');
            paragraphs[2].parentNode.insertBefore(ad, paragraphs[2].nextSibling);
            adsInserted++;
        }

        // Engagement ad after 5th paragraph
        if (paragraphs.length > 5 && adsInserted < config.maxAdsPerArticle) {
            const refreshed = contentEl.querySelectorAll('p, .article-section-block');
            let count = 0;
            let target = null;
            for (const el of refreshed) {
                if (!el.classList.contains('in-article-ad')) {
                    count++;
                    if (count === 6) { target = el; break; }
                }
            }
            if (target) {
                const ad = this.createInArticleAd('engageAfter5', config.placements.engageAfter5.size, 'engagement');
                target.parentNode.insertBefore(ad, target.nextSibling);
                adsInserted++;
            }
        }
    },

    createInArticleAd(slotName, size, type) {
        const wrapper = document.createElement('div');
        wrapper.className = 'in-article-ad';
        wrapper.innerHTML = `
            <div class="ad-label-inline">Advertisement</div>
            <div class="ad-slot-inline" data-ad-slot="${slotName}" data-ad-size="${size}"></div>
        `;
        const slot = wrapper.querySelector('.ad-slot-inline');
        this.renderAd(slot, slotName, size);
        return wrapper;
    },

    // Sticky footer ad for mobile
    setupStickyAd() {
        const stickyAd = document.getElementById('stickyAd');
        const dismiss = document.getElementById('stickyAdDismiss');
        if (!stickyAd) return;

        if (window.innerWidth <= 768) {
            setTimeout(() => {
                stickyAd.classList.add('visible');
                const slot = stickyAd.querySelector('[data-ad-slot]');
                if (slot) this.renderAd(slot, 'stickyMobile', '320x50');
            }, 4000);
        }

        if (dismiss) {
            dismiss.addEventListener('click', () => {
                stickyAd.classList.remove('visible');
                stickyAd.style.display = 'none';
            });
        }
    },

    // Viewability tracking with IntersectionObserver
    observeViewability() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slotName = entry.target.getAttribute('data-ad-slot') || 'unknown';
                    if (!this.impressions[slotName]) {
                        this.impressions[slotName] = true;
                        this.trackImpression(slotName);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-ad-slot]').forEach(el => observer.observe(el));
    },

    trackImpression(slotName) {
        // Analytics integration point
    }
};
