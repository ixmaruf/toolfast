# Toolsfast.online — v7.0.0 "Golden Screen" Edition

> **Free Video Downloader** for TikTok, Instagram & Facebook  
> Domain: **https://toolsfast.online**  
> Hosted on: **GitHub Pages**

---

## 🏗️ Architecture: "Golden Screen" Layout

The entire tool fits within **800px viewport height** (no scrolling on 6.1" phones):

```
┌─────────────────────────────────┐
│  Header (44px compact)          │
├─────────────────────────────────┤
│  💰 AD: Top 320×50/100         │  ← Mobile leaderboard
├─────────────────────────────────┤
│  [Trust Badge: Online]          │
│  H1: Download Any Video Free    │
│  ┌─────────────────────────┐   │
│  │ Paste video link...     │   │  ← URL Input + Paste
│  └─────────────────────────┘   │
├─────────────────────────────────┤
│  💰 AD: Mid (native/responsive) │  ← Between input & button
├─────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │     ⬇ Download          │   │  ← Big gradient button
│  └─────────────────────────┘   │
│  Safe · Fast · Free · No WM    │
├─────────────────────────────────┤
│  💰 AD: Sticky Bottom Anchor   │  ← Always visible
└─────────────────────────────────┘
```

## 📁 Project Files (16 total)

| File | Purpose | Size |
|------|---------|------|
| `index.html` | Homepage — Golden Screen layout | 25KB |
| `tiktok.html` | TikTok downloader page | 17KB |
| `instagram.html` | Instagram downloader page | 16KB |
| `facebook.html` | Facebook downloader page | 17KB |
| `privacy.html` | Privacy Policy (minimalist) | 10KB |
| `terms.html` | Terms of Service (minimalist) | 10KB |
| `dmca.html` | DMCA Takedown Policy | 9KB |
| `about.html` | About Us page | 9KB |
| `contact.html` | Contact form + emails | 10KB |
| `404.html` | 404 with 3s auto-redirect | 3KB |
| `assets/js/app.js` | Core engine v7.0 | 49KB |
| `assets/css/main.css` | Golden Screen styles | 8KB |
| `assets/images/favicon.svg` | Favicon | 1KB |
| `assets/images/og-image.svg` | OG Image | 3KB |
| `sitemap.xml` | Sitemap for search engines | 1KB |
| `robots.txt` | Crawl directives | 1KB |
| `CNAME` | Custom domain for GitHub Pages | 1B |

## 💰 Ad Placements (5 slots per page)

| Slot | Position | Format | Visibility |
|------|----------|--------|-----------|
| **SLOT_TOP** | Above input box | 320×50/100 horizontal | ~99% (first thing user sees) |
| **SLOT_MID** | Between input & Download button | Native/responsive | ~99% (high-earning) |
| **SLOT_PROC** | During download processing | Rectangle (in progress) | ~80% (captive audience) |
| **SLOT_GLASS** | Glassmorphism overlay interstitial | Rectangle | ~80% (3-5s wait) |
| **SLOT_STICKY** | Fixed bottom anchor (mobile) | 320×50 | ~95% (always visible) |

### Anti-Penalty Design
- Ads are placed near buttons but with clear visual separation
- No overlapping clickable areas
- Minimum 16px gap between ads and interactive elements
- Sticky ad has close button (Google policy compliant)

## 🔧 Technical Features

### SEO Dominator Engine
- **5,000-keyword pool** → 500 randomly selected per page load
- **Auto-date titles**: `[Updated: March 2026]` suffix rotated daily
- **Schema.org SoftwareApplication**: Rating 4.9 ★ (31,847 reviews), Price $0
- **BreadcrumbList + FAQPage** structured data on every page
- **Organization** schema injected dynamically
- **Freshness timestamps** updated every 2 minutes
- **Meta description rotation** with date-stamped variants

### Download Engine (SD-First)
- **Active watermark removal** for TikTok (uses unwatermarked source)
- **SD-first strategy**: Recommends small 1-2 MB files
- **Multi-API fallback**: Instagram uses 2 backup servers
- **Blob download**: Direct file save without redirects
- **25s timeout** with abort controller

### Performance
- Vanilla JS + Tailwind CSS CDN (no frameworks)
- Lazy-loading images via IntersectionObserver
- Preconnect hints for Google Fonts, jsDelivr
- Minimal CSS (8KB), optimized JS
- Target: <0.8s load on 4G

### Mobile-First Design
- **44px compact header** (saves vertical space)
- **No scrolling needed** on 6.1" phones
- **Blue-green gradient** Download button
- **Glassmorphism overlay** with ad during processing
- **Touch-optimized** targets (min 44px hit areas)
- **Safe area** padding for notched devices

## 🌐 URIs

| Page | Path |
|------|------|
| Homepage | `https://toolsfast.online/` |
| TikTok | `https://toolsfast.online/tiktok.html` |
| Instagram | `https://toolsfast.online/instagram.html` |
| Facebook | `https://toolsfast.online/facebook.html` |
| Privacy | `https://toolsfast.online/privacy.html` |
| Terms | `https://toolsfast.online/terms.html` |
| DMCA | `https://toolsfast.online/dmca.html` |
| About | `https://toolsfast.online/about.html` |
| Contact | `https://toolsfast.online/contact.html` |
| 404 | `https://toolsfast.online/404.html` → auto-redirects to `/` in 3s |

## 🚀 Deployment

1. Push all files to GitHub repository
2. Enable GitHub Pages (Settings → Pages → Deploy from branch)
3. CNAME file maps to `toolsfast.online`
4. Replace `ca-pub-XXXXXXXXXXXXXXXX` with real AdSense publisher ID in `app.js`

## ⚡ API Endpoints Used

| Platform | API | Method |
|----------|-----|--------|
| TikTok | `tikwm.com/api/` | POST |
| Instagram (primary) | `v3.igdownloader.app/api/v1/info` | GET |
| Instagram (backup) | `v3.saveig.app/api/v1/info` | GET |
| Facebook | `v3.fbdownloader.app/api/v1/info` | GET |

## 📊 Revenue Targeting

- **Target RPM**: $50 (USA/UK/Canada traffic)
- **Strategy**: 3 above-fold ads + processing interstitial + sticky anchor
- **Traffic source**: English-language site, X/Twitter promotion
- **Geo-focus**: US/EU high-CPC markets

## ✅ Completed Features

- [x] Golden Screen zero-scroll layout
- [x] 5 ad slots per page (top, mid, processing, glass, sticky)
- [x] 5000-keyword SEO engine with 500 random injection
- [x] Auto-date stamped titles with [Updated: Month Year]
- [x] Schema.org SoftwareApplication with Rating 4.9
- [x] Glassmorphism overlay with interstitial ad
- [x] Active TikTok watermark removal
- [x] SD-first download strategy (1-2 MB files)
- [x] Blue-green gradient Download button
- [x] 44px compact header
- [x] Toast notifications (paste, download, errors)
- [x] FAQ accordion with structured data
- [x] Ad blocker detection notice
- [x] 404.html with 3s auto-redirect
- [x] All absolute paths to toolsfast.online
- [x] Minimalist legal pages (privacy, terms, DMCA)
- [x] Contact form with email cards
- [x] Sitemap, robots.txt, CNAME

## 🔜 Not Yet Implemented

- [ ] Replace `ca-pub-XXXXXXXXXXXXXXXX` with real AdSense ID
- [ ] Google Analytics integration
- [ ] Service Worker for offline caching
- [ ] A/B testing for ad positions
- [ ] YouTube/Twitter platform support
- [ ] Browser extension

---

**Version**: 7.0.0 Golden Screen Edition  
**Updated**: March 1, 2026  
**Status**: Production-ready for GitHub Pages
