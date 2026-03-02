# ToolsFast News Portal - Complete Autonomous System

**Domain:** toolsfast.online
**Target:** US/UK audiences, $20-$50 CPM
**Engine:** Fully autonomous via GitHub Actions

---

## System Architecture

```
toolsfast.online/
  index.html                  Homepage (8 categories, hero, trending)
  article.html                Dynamic article viewer (Table API)
  category.html               Category listing
  search.html                 Search results
  admin.html                  Editorial dashboard
  about.html                  About (AdSense required)
  privacy.html                Privacy policy (AdSense required)
  terms.html                  Terms of service (AdSense required)
  contact.html                Contact page
  robots.txt                  Crawler directives
  sitemap.xml                 Auto-updated XML sitemap
  article_template.html       Template for Python engine
  news_engine.py              Autonomous publishing engine
  css/
    style.css                 Premium stylesheet (28KB)
  js/
    config.js                 Configuration + 40 news sources (12KB)
    seo.js                    LSI keyword engine - 5000 per article (23KB)
    ads.js                    Multi-network ad system (8KB)
    main.js                   Homepage application logic (19KB)
  images/
    logo.png                  Site logo
    articles/                 Auto-fetched article images
  articles/                   Generated static HTML articles
  data/
    articles.json             Article database
    articles_index.json       Frontend article index
  logs/
    engine.log                Engine execution log
  .github/
    workflows/
      publish.yml             Cron job (every 60 minutes)
```

---

## Automation Pipeline

The news engine runs automatically every 60 minutes via GitHub Actions:

```
1. GATHER TOPICS
   Google Trends (US + UK)
      |
   NewsAPI (10 categories)
      |
   GNews API (6 categories)
      |
   RSS Fallback (40+ feeds: Reuters, BBC, ESPN, TechCrunch...)

2. SELECT BEST TOPICS
   Deduplicate -> Category diversity -> Viral priority

3. GENERATE CONTENT (AI Rotation)
   Gemini 1.5 Pro (primary)
      |  [if rate limited]
   Groq Key 1 (LLaMA 3.3 70B)
      |  [if rate limited]
   Groq Key 2 (backup)

4. ENHANCE
   5,000-6,000 word investigative article
   2,000+ LSI keywords generated
   HD image from Pexels/Pixabay
   Professional headline + excerpt

5. PUBLISH
   Static HTML via article_template.html
   Sitemap auto-updated
   IndexNow ping to Bing/Google
   Git commit + push

6. CLEANUP
   Delete images older than 45 days
   Keep text articles forever
```

---

## Required GitHub Secrets

Go to your repository: **Settings > Secrets and variables > Actions > New repository secret**

| Secret Name | Where to Get It | Required |
|-------------|----------------|----------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | Yes |
| `NEWS_API_KEY` | [NewsAPI.org](https://newsapi.org/register) | Yes |
| `GNEWS_API_KEY` | [GNews.io](https://gnews.io/) | Yes |
| `GROQ_KEY_1` | [Groq Console](https://console.groq.com/keys) | Yes |
| `GROQ_KEY_2` | [Groq Console](https://console.groq.com/keys) (second key) | Yes |
| `PEXELS_KEY` | [Pexels API](https://www.pexels.com/api/) | Recommended |
| `PIXABAY_KEY` | [Pixabay API](https://pixabay.com/api/docs/) | Recommended |
| `BING_INDEXNOW_KEY` | [IndexNow](https://www.indexnow.org/) - Generate any key | Recommended |

---

## Deployment Instructions (Step by Step)

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `toolsfast.online` (or any name)
3. Make it **Public** (required for GitHub Pages)
4. Click **Create repository**

### Step 2: Upload All Files

Upload every file from this project to the repository. You can:
- Use **GitHub web interface**: Add file > Upload files
- Or use **git command line**:

```bash
git clone https://github.com/YOUR_USERNAME/toolsfast.online.git
cd toolsfast.online
# Copy all project files here
git add -A
git commit -m "Initial ToolsFast deployment"
git push origin main
```

### Step 3: Add API Secrets

1. Go to repository **Settings**
2. Click **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add each secret from the table above

### Step 4: Enable GitHub Pages

1. Go to repository **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / root
4. Click **Save**

### Step 5: Connect Custom Domain

1. In **Settings > Pages**, enter `toolsfast.online` in Custom domain
2. At your domain registrar, add these DNS records:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

3. Check **Enforce HTTPS**

### Step 6: Enable GitHub Actions

1. Go to repository **Actions** tab
2. You should see **ToolsFast Auto-Publisher** workflow
3. Click **Enable workflows** if prompted
4. Click **Run workflow** to test manually

---

## Ad Setup Guide

### Google AdSense

1. Apply at [adsense.google.com](https://adsense.google.com)
2. Once approved, get your Publisher ID (ca-pub-XXXX)
3. Edit `js/config.js`:

```javascript
adsense: {
    enabled: true,
    publisherId: 'ca-pub-YOUR_ACTUAL_ID',
    slots: {
        headerBanner: 'YOUR_SLOT_1',
        inArticle2: 'YOUR_SLOT_2',
        inArticle5: 'YOUR_SLOT_3',
        stickyFooter: 'YOUR_SLOT_4'
    }
}
```

### Ezoic

1. Apply at [ezoic.com](https://www.ezoic.com)
2. Add your site ID to `js/config.js`

### Media.net

1. Apply at [media.net](https://www.media.net)
2. Add your customer ID and widget ID

---

## Article Structure

Every auto-generated article follows this editorial format:

1. **Introduction** (3-4 paragraphs) - Compelling hook, why it matters
2. **Background and Historical Context** (5-6 paragraphs) - Deep background
3. **Current Developments** (6-8 paragraphs) - Latest reporting with data
4. **Expert Analysis** (4-5 paragraphs) - Attributed expert quotes
5. **Market and Economic Implications** (4-5 paragraphs) - Financial impact
6. **Policy and Regulatory Dimensions** (3-4 paragraphs) - Government response
7. **What Industry Leaders Are Saying** (3-4 paragraphs) - Corporate perspectives
8. **Global Perspective** (3-4 paragraphs) - International dimension
9. **Looking Ahead** (4-5 paragraphs) - Forward-looking analysis
10. **Conclusion** (2-3 paragraphs) - Key takeaways

**Total: 5,000-6,000 words per article**

---

## SEO Features

- 5,000+ LSI keywords per article (hidden in page metadata)
- Full Open Graph and Twitter Card tags
- NewsArticle structured data (JSON-LD)
- BreadcrumbList structured data
- Hreflang tags for en-US and en-GB
- Auto-generated XML sitemap
- Bing IndexNow instant indexing
- High-CPC keyword clusters (insurance, legal, finance, health)
- Live keyword listener (updates every 60 seconds on article pages)

---

## Bangla Instructions (Setup Guide)

### ধাপ ১: গিটহাব রিপোজিটরি তৈরি করুন
github.com/new তে গিয়ে একটি নতুন Public রিপোজিটরি তৈরি করুন।

### ধাপ ২: সব ফাইল আপলোড করুন
এই প্রজেক্টের সব ফাইল গিটহাবে আপলোড করুন। "Add file > Upload files" ব্যবহার করুন।

### ধাপ ৩: API Keys সেট করুন
রিপোজিটরির Settings > Secrets and variables > Actions এ গিয়ে নিচের সিক্রেটগুলো যোগ করুন:
- `GEMINI_API_KEY` - Google AI Studio থেকে নিন
- `NEWS_API_KEY` - NewsAPI.org থেকে ফ্রি রেজিস্ট্রেশন করুন
- `GNEWS_API_KEY` - GNews.io থেকে নিন
- `GROQ_KEY_1` এবং `GROQ_KEY_2` - Groq Console থেকে দুটি আলাদা কী তৈরি করুন
- `PEXELS_KEY` - Pexels.com/api থেকে নিন
- `PIXABAY_KEY` - Pixabay.com/api থেকে নিন
- `BING_INDEXNOW_KEY` - যেকোনো র্যান্ডম স্ট্রিং দিন

### ধাপ ৪: GitHub Pages চালু করুন
Settings > Pages এ গিয়ে Branch: main সিলেক্ট করুন এবং Save দিন।

### ধাপ ৫: ডোমেইন কানেক্ট করুন
Custom domain বক্সে toolsfast.online লিখুন। আপনার ডোমেইন রেজিস্ট্রারে A record যোগ করুন।

### ধাপ ৬: Actions চালু করুন
Actions ট্যাবে গিয়ে "Run workflow" বাটনে ক্লিক করুন। প্রতি ঘণ্টায় স্বয়ংক্রিয়ভাবে নতুন আর্টিকেল পাবলিশ হবে।

### ফলাফল
- প্রতি ঘণ্টায় ৩টি করে ৫০০০+ শব্দের ইনভেস্টিগেটিভ নিউজ পাবলিশ হবে
- প্রতিদিন গড়ে ১৫-২০টি আর্টিকেল
- ২০০০+ LSI কীওয়ার্ড প্রতিটি আর্টিকেলে
- স্বয়ংক্রিয় সাইটম্যাপ আপডেট এবং গুগল ইনডেক্সিং
- ৪৫ দিন পর পুরানো ছবি মুছে যাবে, টেক্সট চিরকাল থাকবে

---

## Revenue Projections

| Metric | Value |
|--------|-------|
| Target CPM | $20-$50 (US/UK traffic) |
| Articles per day | 15-20 (automated) |
| Words per article | 5,000-6,000 |
| Ad slots per article | 5 |
| LSI keywords per article | 2,000+ |
| Categories | 8 |
| News sources | 40+ |
| Image auto-delete | 45 days |

---

## Technical Notes

- **Python version:** 3.11 (GitHub Actions)
- **No pip dependencies:** Uses only Python standard library
- **AI rotation:** Gemini 1.5 Pro > Groq Key 1 > Groq Key 2
- **Rate limiting:** Built-in delays between API calls
- **Error handling:** Full fallback chain (API > API > RSS)
- **Deduplication:** Slug-based duplicate detection
- **Concurrency:** Only one workflow runs at a time
