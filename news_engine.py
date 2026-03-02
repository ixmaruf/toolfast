#!/usr/bin/env python3
"""
ToolsFast News Engine v2.0
===========================
Fully autonomous news generation, SEO optimization, and publishing pipeline.
Designed for GitHub Actions execution targeting US/UK audiences.

Required GitHub Secrets:
    GEMINI_API_KEY, NEWS_API_KEY, GNEWS_API_KEY,
    GROQ_KEY_1, GROQ_KEY_2,
    PEXELS_KEY, PIXABAY_KEY,
    BING_INDEXNOW_KEY
"""

import os
import sys
import json
import time
import random
import hashlib
import re
import glob
import shutil
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path
from string import Template

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SITE_URL = "https://toolsfast.online"
SITE_NAME = "ToolsFast"
ARTICLES_DIR = Path("articles")
IMAGES_DIR = Path("images/articles")
DATA_FILE = Path("data/articles.json")
SITEMAP_FILE = Path("sitemap.xml")
INDEX_FILE = Path("index.html")
TEMPLATE_FILE = Path("article_template.html")
LOG_FILE = Path("logs/engine.log")

IMAGE_RETENTION_DAYS = 45
MIN_WORD_COUNT = 5000
MAX_WORD_COUNT = 6000
MAX_ARTICLES_PER_RUN = 3
LSI_KEYWORDS_TARGET = 2000

CATEGORIES = [
    "world", "technology", "finance", "politics",
    "science", "health", "sports", "ai"
]

CATEGORY_LABELS = {
    "world": "World",
    "technology": "Technology",
    "finance": "Finance",
    "politics": "Politics",
    "science": "Science",
    "health": "Health",
    "sports": "Sports",
    "ai": "AI and Innovation"
}

HIGH_CPC_KEYWORDS = {
    "finance": [
        "best life insurance policies", "mortgage refinance rates today",
        "high yield savings account", "business loan interest rates",
        "credit card cashback rewards", "cryptocurrency investment strategy",
        "stock market analysis", "retirement planning guide",
        "tax filing strategies", "commercial real estate investing",
        "personal injury settlement amounts", "mesothelioma attorney fees",
        "structured settlement buyers", "auto insurance comparison",
        "home equity loan rates", "forex trading platforms",
        "wealth management services", "annuity investment returns"
    ],
    "technology": [
        "best cloud hosting providers", "enterprise cybersecurity solutions",
        "managed IT services pricing", "SaaS platform comparison",
        "best VPN services", "data recovery services",
        "ERP software small business", "CRM platform reviews",
        "web hosting comparison", "antivirus software reviews"
    ],
    "health": [
        "best health insurance plans", "online therapy platforms",
        "prescription drug costs", "telemedicine consultation services",
        "dental implant costs", "Medicare supplement plans",
        "addiction treatment centers", "weight loss programs",
        "hearing aid prices", "laser eye surgery costs"
    ],
    "legal": [
        "personal injury lawyer fees", "wrongful death attorney",
        "workers compensation claim process", "medical malpractice lawsuit",
        "DUI attorney consultation", "bankruptcy lawyer costs",
        "estate planning attorney fees", "immigration lawyer services"
    ]
}

# RSS feed fallbacks when APIs fail
RSS_FEEDS = {
    "world": [
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
        "https://www.theguardian.com/world/rss",
    ],
    "technology": [
        "https://techcrunch.com/feed/",
        "https://www.theverge.com/rss/index.xml",
        "https://feeds.arstechnica.com/arstechnica/index",
    ],
    "finance": [
        "https://feeds.marketwatch.com/marketwatch/topstories/",
        "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    ],
    "politics": [
        "https://www.politico.com/rss/politicopicks.xml",
        "https://feeds.npr.org/1014/rss.xml",
    ],
    "science": [
        "https://www.nasa.gov/rss/dyn/breaking_news.rss",
        "https://www.sciencedaily.com/rss/all.xml",
    ],
    "health": [
        "https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC",
        "https://www.nih.gov/news-events/news-releases/feed",
    ],
    "sports": [
        "https://www.espn.com/espn/rss/news",
        "https://www.cbssports.com/rss/headlines/",
    ],
    "ai": [
        "https://techcrunch.com/category/artificial-intelligence/feed/",
        "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    ]
}

# Author pool for bylines
AUTHORS = [
    "Michael Chen", "Sarah Mitchell", "James Crawford", "Victoria Park",
    "Dr. Robert Ellis", "Dr. Amanda Reeves", "Marcus Johnson",
    "Daniel Foster", "Elizabeth Warren", "Kevin Rodriguez",
    "Thomas Wright", "Dr. Patricia Neal", "Catherine Brooks",
    "Andrew Phillips", "Rachel Morrison", "David Kessler"
]

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------

LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout)
    ]
)
log = logging.getLogger("toolsfast")

# ---------------------------------------------------------------------------
# Utility helpers
# ---------------------------------------------------------------------------

def env(key, default=""):
    return os.environ.get(key, default)


def slug(text):
    s = re.sub(r"[^a-z0-9]+", "-", text.lower().strip())
    return s.strip("-")[:80]


def word_count(text):
    clean = re.sub(r"<[^>]*>", "", text)
    return len(clean.split())


def sha256(text):
    return hashlib.sha256(text.encode()).hexdigest()[:12]


def load_json(path):
    path = Path(path)
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def today_str():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")

# ---------------------------------------------------------------------------
# 1. TOPIC SOURCING
# ---------------------------------------------------------------------------

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET


def fetch_json(url, headers=None, timeout=15):
    """Fetch JSON from a URL with error handling."""
    try:
        req = urllib.request.Request(url, headers=headers or {})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        log.warning(f"fetch_json failed for {url}: {e}")
        return None


def fetch_rss(url, timeout=15):
    """Parse RSS feed and return list of dicts with title, description, link."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ToolsFast/2.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            tree = ET.fromstring(resp.read())
        items = []
        for item in tree.iter("item"):
            title = item.findtext("title", "")
            desc = item.findtext("description", "")
            link = item.findtext("link", "")
            if title:
                items.append({"title": title, "description": desc, "url": link})
        return items
    except Exception as e:
        log.warning(f"fetch_rss failed for {url}: {e}")
        return []


def fetch_google_trends():
    """Fetch trending searches from Google Trends RSS for US and UK."""
    trends = []
    for geo in ["US", "GB"]:
        url = f"https://trends.google.com/trending/rss?geo={geo}"
        items = fetch_rss(url)
        for item in items:
            trends.append({
                "title": item["title"],
                "source": f"Google Trends ({geo})",
                "category": classify_topic(item["title"]),
                "url": item.get("url", "")
            })
    log.info(f"Google Trends: found {len(trends)} trending topics")
    return trends


def fetch_newsapi(query="", category="general"):
    """Fetch top headlines from NewsAPI."""
    key = env("NEWS_API_KEY")
    if not key:
        log.warning("NEWS_API_KEY not set, skipping NewsAPI")
        return []
    params = urllib.parse.urlencode({
        "country": "us",
        "category": category if not query else "",
        "q": query,
        "pageSize": 10,
        "apiKey": key
    })
    url = f"https://newsapi.org/v2/top-headlines?{params}"
    data = fetch_json(url)
    if not data or data.get("status") != "ok":
        return []
    results = []
    for art in data.get("articles", []):
        if art.get("title") and art["title"] != "[Removed]":
            results.append({
                "title": art["title"],
                "description": art.get("description", ""),
                "source": art.get("source", {}).get("name", "NewsAPI"),
                "url": art.get("url", "")
            })
    log.info(f"NewsAPI ({category}): found {len(results)} articles")
    return results


def fetch_gnews(query="", category="general"):
    """Fetch articles from GNews API."""
    key = env("GNEWS_API_KEY")
    if not key:
        log.warning("GNEWS_API_KEY not set, skipping GNews")
        return []
    params = urllib.parse.urlencode({
        "category": category,
        "q": query,
        "lang": "en",
        "country": "us",
        "max": 10,
        "apikey": key
    })
    url = f"https://gnews.io/api/v4/top-headlines?{params}"
    data = fetch_json(url)
    if not data:
        return []
    results = []
    for art in data.get("articles", []):
        if art.get("title"):
            results.append({
                "title": art["title"],
                "description": art.get("description", ""),
                "source": art.get("source", {}).get("name", "GNews"),
                "url": art.get("url", ""),
                "image": art.get("image", "")
            })
    log.info(f"GNews ({category}): found {len(results)} articles")
    return results


def fetch_rss_fallback(category):
    """Fallback: fetch from RSS feeds when APIs fail."""
    feeds = RSS_FEEDS.get(category, [])
    all_items = []
    for feed_url in feeds:
        items = fetch_rss(feed_url)
        for item in items:
            item["source"] = feed_url.split("/")[2]
            item["category"] = category
        all_items.extend(items)
    log.info(f"RSS fallback ({category}): found {len(all_items)} items")
    return all_items


def classify_topic(text):
    """Simple keyword-based topic classification."""
    text_lower = text.lower()
    keyword_map = {
        "technology": ["tech", "apple", "google", "microsoft", "software", "chip", "iphone", "android", "startup"],
        "finance": ["stock", "market", "fed", "inflation", "bank", "invest", "economy", "dollar", "crypto", "bitcoin"],
        "politics": ["congress", "senate", "president", "election", "democrat", "republican", "vote", "policy", "white house"],
        "sports": ["nfl", "nba", "mlb", "soccer", "football", "basketball", "tennis", "olympic", "league", "championship"],
        "health": ["health", "medical", "vaccine", "cancer", "hospital", "drug", "therapy", "disease", "mental health"],
        "science": ["nasa", "space", "climate", "research", "discovery", "mars", "quantum", "physics", "biology"],
        "ai": ["ai", "artificial intelligence", "chatgpt", "openai", "machine learning", "deep learning", "robot", "neural"],
        "world": ["war", "nato", "ukraine", "china", "europe", "middle east", "diplomatic", "united nations", "summit"]
    }
    for cat, keywords in keyword_map.items():
        if any(kw in text_lower for kw in keywords):
            return cat
    return "world"


def gather_topics():
    """
    Multi-layer topic sourcing:
    1. Google Trends (US + UK)
    2. NewsAPI
    3. GNews
    4. RSS fallback if APIs return nothing
    """
    all_topics = []

    # Layer 1: Google Trends
    trends = fetch_google_trends()
    all_topics.extend(trends)

    # Layer 2: NewsAPI across categories
    for cat in ["general", "technology", "business", "science", "health", "sports"]:
        articles = fetch_newsapi(category=cat)
        for art in articles:
            art["category"] = classify_topic(art["title"])
        all_topics.extend(articles)

    # Layer 3: GNews
    for cat in ["general", "technology", "business", "science", "health", "sports"]:
        articles = fetch_gnews(category=cat)
        for art in articles:
            art["category"] = classify_topic(art["title"])
        all_topics.extend(articles)

    # Layer 4: RSS fallback if we have fewer than 5 topics
    if len(all_topics) < 5:
        log.info("API results sparse, activating RSS fallback")
        for cat in CATEGORIES:
            all_topics.extend(fetch_rss_fallback(cat))

    # Deduplicate by title similarity
    seen = set()
    unique = []
    for topic in all_topics:
        title_key = slug(topic.get("title", ""))[:40]
        if title_key not in seen and len(topic.get("title", "")) > 20:
            seen.add(title_key)
            unique.append(topic)

    log.info(f"Total unique topics gathered: {len(unique)}")
    return unique


def select_topics(topics, existing_slugs, count=MAX_ARTICLES_PER_RUN):
    """Select the best topics to write about, avoiding duplicates."""
    # Filter out already-published topics
    candidates = []
    for topic in topics:
        topic_slug = slug(topic.get("title", ""))
        if topic_slug not in existing_slugs and len(topic.get("title", "")) > 20:
            candidates.append(topic)

    # Prioritize by category diversity
    selected = []
    used_categories = set()
    for topic in candidates:
        cat = topic.get("category", "world")
        if cat not in used_categories and len(selected) < count:
            selected.append(topic)
            used_categories.add(cat)

    # Fill remaining slots
    for topic in candidates:
        if topic not in selected and len(selected) < count:
            selected.append(topic)

    return selected[:count]

# ---------------------------------------------------------------------------
# 2. ARTICLE GENERATION (Gemini / Groq rotation)
# ---------------------------------------------------------------------------

def call_gemini(prompt, max_retries=2):
    """Call Google Gemini 1.5 Pro API."""
    key = env("GEMINI_API_KEY")
    if not key:
        log.warning("GEMINI_API_KEY not set")
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={key}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 16384,
            "topP": 0.9
        }
    }).encode("utf-8")

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                url,
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            log.info(f"Gemini response received ({len(text)} chars)")
            return text
        except Exception as e:
            log.warning(f"Gemini attempt {attempt + 1} failed: {e}")
            time.sleep(3)
    return None


def call_groq(prompt, key_name="GROQ_KEY_1"):
    """Call Groq API with LLaMA model."""
    key = env(key_name)
    if not key:
        log.warning(f"{key_name} not set")
        return None

    url = "https://api.groq.com/openai/v1/chat/completions"
    payload = json.dumps({
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": "You are a Pulitzer-winning investigative journalist writing for a premium American English news outlet read by professionals in the United States and United Kingdom. Write in a formal, authoritative tone. Never use emojis, vertical bars, or AI-style symbols. Structure your writing with clear H2 and H3 headers, short paragraphs, and data-driven analysis."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 16384
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            url,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {key}"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        text = data["choices"][0]["message"]["content"]
        log.info(f"Groq ({key_name}) response received ({len(text)} chars)")
        return text
    except Exception as e:
        log.warning(f"Groq ({key_name}) failed: {e}")
        return None


def generate_article_content(topic_title, topic_description, category):
    """
    Generate a 5,000-6,000 word investigative article.
    Rotation: Gemini -> Groq Key 1 -> Groq Key 2
    """
    cat_label = CATEGORY_LABELS.get(category, "News")

    prompt = f"""Write a comprehensive investigative news article about the following topic.

TOPIC: {topic_title}
CONTEXT: {topic_description}
CATEGORY: {cat_label}

STRICT REQUIREMENTS:
1. Word count: Between 5,000 and 6,000 words. This is non-negotiable.
2. Language: Premium American English only. No British spellings.
3. NEVER use emojis, vertical bars, or AI-style formatting symbols.
4. NEVER use dashes like '---' or '***' as separators.
5. Tone: Formal, authoritative, investigative. Like the New York Times or Reuters.

REQUIRED STRUCTURE (use HTML tags):
<h2>Introduction</h2>
Write 3-4 paragraphs introducing the topic with a compelling hook. Establish why this matters to American and British readers right now.

<h2>Background and Historical Context</h2>
Write 5-6 paragraphs providing deep background. Reference relevant policy decisions, market movements, or historical precedents from the past 12-24 months.

<h2>Current Developments</h2>
Write 6-8 paragraphs with detailed reporting on the latest developments. Include specific data points, statistics, and factual details.

<h2>Expert Analysis</h2>
Write 4-5 paragraphs featuring expert opinions. Create realistic but clearly attributed expert quotes from professors, analysts, and industry leaders. Format quotes in <blockquote> tags.

<h2>Market and Economic Implications</h2>
Write 4-5 paragraphs analyzing financial impact. Reference specific market sectors, equity movements, and economic indicators.

<h2>Policy and Regulatory Dimensions</h2>
Write 3-4 paragraphs on the regulatory and policy landscape. Reference specific legislation, regulatory bodies, and government responses.

<h2>What Industry Leaders Are Saying</h2>
Write 3-4 paragraphs with additional expert perspectives. Include diverse viewpoints from corporate executives, academics, and policy analysts.

<h2>Global Perspective</h2>
Write 3-4 paragraphs analyzing the international dimension. How are other nations and international organizations responding?

<h2>Looking Ahead: What Comes Next</h2>
Write 4-5 paragraphs with forward-looking analysis. Include specific timelines, milestones, and scenarios.

<h2>Conclusion</h2>
Write 2-3 paragraphs summarizing key takeaways.

FORMATTING RULES:
- Use <p> tags for paragraphs
- Use <h2> and <h3> for headings (no H1)
- Use <ul><li> for bullet points
- Use <blockquote> for expert quotes
- Use <strong> for emphasis
- Keep paragraphs short (3-5 sentences each)
- Include at least 8 bullet-point lists throughout
- Include at least 6 expert quotes in blockquote format

Output ONLY the HTML content. No markdown, no code fences, no explanations."""

    # Rotation: Gemini first, then Groq keys
    content = call_gemini(prompt)
    if content and word_count(content) >= 3000:
        return clean_content(content)

    log.info("Gemini insufficient, trying Groq Key 1")
    content = call_groq(prompt, "GROQ_KEY_1")
    if content and word_count(content) >= 3000:
        return clean_content(content)

    log.info("Groq Key 1 insufficient, trying Groq Key 2")
    content = call_groq(prompt, "GROQ_KEY_2")
    if content and word_count(content) >= 3000:
        return clean_content(content)

    log.error("All AI providers failed or returned insufficient content")
    return None


def clean_content(html):
    """Clean AI-generated content: remove markdown artifacts, code fences, emojis."""
    # Remove code fences
    html = re.sub(r"```html?\s*", "", html)
    html = re.sub(r"```\s*", "", html)

    # Remove emojis
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"
        "\U0001F300-\U0001F5FF"
        "\U0001F680-\U0001F6FF"
        "\U0001F1E0-\U0001F1FF"
        "\U00002702-\U000027B0"
        "\U000024C2-\U0001F251"
        "\U0001f900-\U0001f9FF"
        "\U0001fa00-\U0001fa6f"
        "\U0001fa70-\U0001faff"
        "\U00002600-\U000027BF"
        "]+",
        flags=re.UNICODE
    )
    html = emoji_pattern.sub("", html)

    # Remove vertical bars used as separators
    html = re.sub(r"\s*\|\s*", " ", html)

    # Remove markdown-style separators
    html = re.sub(r"---+", "", html)
    html = re.sub(r"\*\*\*+", "", html)

    # Clean up whitespace
    html = re.sub(r"\n{3,}", "\n\n", html)

    return html.strip()


def generate_headline(topic_title, category):
    """Generate a compelling, professional headline."""
    prompt = f"""Rewrite this news topic as a compelling, professional headline for a premium American news outlet.

TOPIC: {topic_title}
CATEGORY: {CATEGORY_LABELS.get(category, 'News')}

RULES:
- Maximum 100 characters
- Professional tone (like New York Times or Reuters)
- No emojis, no clickbait phrases like "You Won't Believe"
- No question marks
- Use strong, active verbs
- Include specific details when possible

Output ONLY the headline text, nothing else."""

    headline = call_gemini(prompt)
    if headline:
        headline = headline.strip().strip('"').strip("'")
        headline = re.sub(r"[^\w\s\-:,.'()]", "", headline)
        if len(headline) > 15:
            return headline[:120]

    # Fallback: clean and use the original
    clean = re.sub(r"[^\w\s\-:,.'()]", "", topic_title)
    return clean[:120]


def generate_excerpt(headline, content):
    """Generate a 160-character excerpt from the article."""
    text = re.sub(r"<[^>]*>", "", content)
    text = re.sub(r"\s+", " ", text).strip()
    sentences = text.split(".")
    excerpt = ""
    for s in sentences[:3]:
        if len(excerpt) + len(s) < 155:
            excerpt += s.strip() + ". "
        else:
            break
    return excerpt.strip()[:160]

# ---------------------------------------------------------------------------
# 3. LSI KEYWORD GENERATION
# ---------------------------------------------------------------------------

LSI_DATABASE = {
    "technology": [
        "artificial intelligence applications", "machine learning algorithms",
        "cloud computing infrastructure", "cybersecurity threat detection",
        "blockchain technology adoption", "quantum computing research",
        "semiconductor chip manufacturing", "5G network deployment",
        "Internet of Things devices", "edge computing solutions",
        "software as a service", "digital transformation strategy",
        "augmented reality experiences", "virtual reality headsets",
        "autonomous vehicle technology", "robotic process automation",
        "natural language processing", "computer vision systems",
        "data analytics platforms", "enterprise software solutions",
        "mobile app development", "open source software",
        "tech industry regulations", "startup funding rounds",
        "venture capital investments", "silicon valley innovation",
        "consumer electronics market", "wearable technology trends",
        "smart home automation", "drone technology commercial"
    ],
    "finance": [
        "stock market volatility", "federal reserve interest rates",
        "inflation rate impact", "cryptocurrency market analysis",
        "bitcoin price prediction", "ethereum blockchain updates",
        "bond yield curve", "treasury bills returns",
        "mutual fund performance", "exchange traded funds",
        "real estate investment trusts", "commercial mortgage rates",
        "auto loan interest rates", "student loan refinancing",
        "credit score improvement", "debt consolidation options",
        "retirement savings accounts", "401k contribution limits",
        "social security benefits", "pension fund management",
        "life insurance premiums", "health insurance marketplace",
        "auto insurance discounts", "homeowners insurance coverage",
        "forex trading strategies", "commodity futures trading",
        "options trading basics", "wealth management services",
        "financial planning advisors", "banking sector performance"
    ],
    "health": [
        "clinical trial results", "pharmaceutical drug approval",
        "vaccine development timeline", "mental health awareness",
        "telemedicine consultation", "cancer research breakthroughs",
        "cardiovascular disease prevention", "diabetes management",
        "nutrition science research", "fitness training programs",
        "sleep disorder treatment", "chronic pain management",
        "dental implant procedures", "vision correction surgery",
        "health insurance premiums", "Medicare advantage plans",
        "prescription drug pricing", "public health emergency",
        "infectious disease outbreak", "epidemiology research"
    ],
    "politics": [
        "presidential election polls", "congressional legislation",
        "supreme court decisions", "executive order analysis",
        "campaign finance reform", "voter registration laws",
        "immigration policy changes", "gun control legislation",
        "healthcare reform proposals", "climate change policy",
        "foreign policy decisions", "defense spending budget",
        "education policy reform", "criminal justice reform",
        "antitrust enforcement", "tech company regulation",
        "infrastructure spending", "state government policies"
    ],
    "science": [
        "space exploration missions", "Mars colonization plans",
        "climate change research", "renewable energy research",
        "nuclear fusion progress", "biodiversity conservation",
        "genetics research CRISPR", "neuroscience discoveries",
        "particle physics experiments", "materials science innovation",
        "nanotechnology applications", "weather pattern analysis",
        "earthquake prediction", "ocean acidification effects",
        "agricultural science", "geological survey results"
    ],
    "sports": [
        "NFL playoff predictions", "Super Bowl championship",
        "NBA season standings", "MLB World Series",
        "Premier League standings", "Champions League results",
        "FIFA World Cup qualifying", "UFC fight results",
        "tennis Grand Slam", "golf major tournaments",
        "Olympic Games preparation", "college football rankings",
        "sports betting odds", "fantasy football advice",
        "athlete injury updates", "esports tournament results"
    ],
    "world": [
        "geopolitical tension analysis", "international trade disputes",
        "United Nations resolutions", "NATO alliance strategy",
        "Middle East peace process", "nuclear nonproliferation",
        "refugee crisis response", "global economic outlook",
        "diplomatic summit outcomes", "climate change summit",
        "energy security concerns", "cyber warfare threats",
        "human rights investigations", "sustainability initiatives"
    ],
    "ai": [
        "large language models", "generative AI applications",
        "neural network architecture", "deep learning research",
        "AI ethics governance", "algorithmic bias detection",
        "AI regulation framework", "natural language generation",
        "computer vision advances", "AI chip development",
        "AI healthcare diagnostics", "AI financial trading",
        "robotics advancement", "AI research papers",
        "AI startup ecosystem", "multimodal AI systems"
    ]
}


def generate_lsi_keywords(title, content, category, tags):
    """Generate 2,000+ LSI keywords for an article."""
    keywords = set()

    # 1. Category-specific keywords
    for kw in LSI_DATABASE.get(category, []):
        keywords.add(kw)

    # 2. Cross-category related
    text_lower = (title + " " + re.sub(r"<[^>]*>", "", content or "")).lower()
    text_words = set(text_lower.split())

    for cat, kw_list in LSI_DATABASE.items():
        for kw in kw_list:
            kw_words = set(kw.lower().split())
            if kw_words & text_words:
                keywords.add(kw)

    # 3. High-CPC keyword injection
    for cat, kw_list in HIGH_CPC_KEYWORDS.items():
        for kw in kw_list:
            keywords.add(kw)

    # 4. N-gram combinations from title
    title_words = [w for w in re.sub(r"[^a-z ]", "", title.lower()).split() if len(w) > 3]
    stop_words = {"the", "and", "for", "with", "that", "this", "from", "have", "been", "will", "would", "could", "should", "about", "into", "also", "just", "more", "than", "very"}
    title_words = [w for w in title_words if w not in stop_words]

    for i in range(len(title_words)):
        for j in range(i + 1, min(i + 4, len(title_words))):
            keywords.add(f"{title_words[i]} {title_words[j]}")
            if j + 1 < len(title_words):
                keywords.add(f"{title_words[i]} {title_words[j]} {title_words[j+1]}")

    # 5. Variations with prefixes/suffixes
    prefixes = ["best", "top", "latest", "how to", "what is", "guide to", "understanding", "complete"]
    suffixes = ["2026", "guide", "review", "comparison", "analysis", "explained", "update", "today"]
    base_kws = list(keywords)[:300]
    for kw in base_kws:
        p = random.choice(prefixes)
        s = random.choice(suffixes)
        keywords.add(f"{p} {kw}")
        keywords.add(f"{kw} {s}")

    # 6. Long-tail from tags
    for tag in (tags or []):
        keywords.add(f"{tag} latest news")
        keywords.add(f"{tag} analysis 2026")
        keywords.add(f"{tag} expert opinion")
        keywords.add(f"what you need to know about {tag}")
        keywords.add(f"how {tag} affects the economy")
        keywords.add(f"{tag} impact on stock market")

    result = list(keywords)[:LSI_KEYWORDS_TARGET]
    log.info(f"Generated {len(result)} LSI keywords")
    return result

# ---------------------------------------------------------------------------
# 4. IMAGE SOURCING (Pexels / Pixabay)
# ---------------------------------------------------------------------------

def fetch_pexels_image(query):
    """Fetch HD image from Pexels API."""
    key = env("PEXELS_KEY")
    if not key:
        return None
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&per_page=3&orientation=landscape"
    try:
        req = urllib.request.Request(url, headers={"Authorization": key})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        photos = data.get("photos", [])
        if photos:
            photo = random.choice(photos[:3])
            img_url = photo["src"]["large2x"]
            log.info(f"Pexels image found: {img_url[:80]}")
            return img_url
    except Exception as e:
        log.warning(f"Pexels fetch failed: {e}")
    return None


def fetch_pixabay_image(query):
    """Fetch HD image from Pixabay API."""
    key = env("PIXABAY_KEY")
    if not key:
        return None
    params = urllib.parse.urlencode({
        "key": key,
        "q": query,
        "image_type": "photo",
        "orientation": "horizontal",
        "min_width": 1200,
        "per_page": 5
    })
    url = f"https://pixabay.com/api/?{params}"
    try:
        data = fetch_json(url)
        hits = data.get("hits", []) if data else []
        if hits:
            hit = random.choice(hits[:3])
            img_url = hit["largeImageURL"]
            log.info(f"Pixabay image found: {img_url[:80]}")
            return img_url
    except Exception as e:
        log.warning(f"Pixabay fetch failed: {e}")
    return None


def download_image(url, article_slug):
    """Download image to local images directory."""
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    ext = "jpg"
    if ".png" in url.lower():
        ext = "png"
    filename = f"{article_slug}.{ext}"
    filepath = IMAGES_DIR / filename

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ToolsFast/2.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(filepath, "wb") as f:
                f.write(resp.read())
        log.info(f"Image downloaded: {filepath}")
        return str(filepath)
    except Exception as e:
        log.warning(f"Image download failed: {e}")
        return None


def get_article_image(title, category):
    """Get an HD image for the article. Try Pexels, then Pixabay, then fallback."""
    query = f"{CATEGORY_LABELS.get(category, 'news')} {title.split()[0]} {title.split()[-1]}"
    query = query[:50]

    img_url = fetch_pexels_image(query)
    if not img_url:
        img_url = fetch_pixabay_image(query)

    if not img_url:
        # Fallback Unsplash (no API key needed for static URLs)
        unsplash_fallbacks = {
            "world": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85",
            "technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
            "finance": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85",
            "politics": "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85",
            "science": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=85",
            "health": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85",
            "sports": "https://images.unsplash.com/photo-1461896836934-bd45ba9ce77a?w=1200&q=85",
            "ai": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85",
        }
        img_url = unsplash_fallbacks.get(category, "https://images.unsplash.com/photo-1504711434969-e33886168d7c?w=1200&q=85")

    return img_url


def cleanup_old_images():
    """Delete image files older than IMAGE_RETENTION_DAYS."""
    if not IMAGES_DIR.exists():
        return
    cutoff = datetime.now() - timedelta(days=IMAGE_RETENTION_DAYS)
    deleted = 0
    for img_path in IMAGES_DIR.iterdir():
        if img_path.is_file():
            mtime = datetime.fromtimestamp(img_path.stat().st_mtime)
            if mtime < cutoff:
                img_path.unlink()
                deleted += 1
    if deleted:
        log.info(f"Cleaned up {deleted} images older than {IMAGE_RETENTION_DAYS} days")

# ---------------------------------------------------------------------------
# 5. ARTICLE PUBLISHING
# ---------------------------------------------------------------------------

def build_article_html(article_data, template_html):
    """Render article HTML from template."""
    # Generate LSI keyword div
    lsi_html = '<div style="display:none" aria-hidden="true">' + ", ".join(article_data["lsi_keywords"][:2000]) + "</div>"

    # Tags HTML
    tags_html = "".join(
        f'<a href="search.html?q={urllib.parse.quote(t)}" class="tag">{t}</a>'
        for t in article_data["tags"]
    )

    replacements = {
        "ARTICLE_TITLE": article_data["title"],
        "ARTICLE_EXCERPT": article_data["excerpt"],
        "ARTICLE_CATEGORY": article_data["category"],
        "ARTICLE_CATEGORY_LABEL": CATEGORY_LABELS.get(article_data["category"], "News"),
        "ARTICLE_AUTHOR": article_data["author"],
        "ARTICLE_DATE": article_data["published_at"][:10],
        "ARTICLE_DATE_FORMATTED": datetime.fromisoformat(article_data["published_at"].replace("Z", "+00:00")).strftime("%B %d, %Y"),
        "ARTICLE_IMAGE": article_data["image"],
        "ARTICLE_CONTENT": article_data["content"],
        "ARTICLE_TAGS_HTML": tags_html,
        "ARTICLE_LSI_KEYWORDS": lsi_html,
        "ARTICLE_KEYWORDS_META": ", ".join(article_data["lsi_keywords"][:500]),
        "ARTICLE_WORD_COUNT": str(article_data["word_count"]),
        "ARTICLE_READ_TIME": str(max(1, article_data["word_count"] // 250)),
        "ARTICLE_URL": f"{SITE_URL}/articles/{article_data['slug']}.html",
        "ARTICLE_SLUG": article_data["slug"],
        "SITE_URL": SITE_URL,
        "SITE_NAME": SITE_NAME,
        "CURRENT_YEAR": str(datetime.now().year)
    }

    html = template_html
    for key, value in replacements.items():
        html = html.replace(f"{{{{{key}}}}}", value)

    return html


def publish_article(article_data, template_html):
    """Write article HTML file to disk."""
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    html = build_article_html(article_data, template_html)
    filepath = ARTICLES_DIR / f"{article_data['slug']}.html"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
    log.info(f"Published: {filepath}")
    return str(filepath)

# ---------------------------------------------------------------------------
# 6. SITEMAP AND INDEX UPDATES
# ---------------------------------------------------------------------------

def update_sitemap(articles):
    """Regenerate sitemap.xml with all articles."""
    urls = [
        {"loc": f"{SITE_URL}/", "lastmod": today_str(), "changefreq": "always", "priority": "1.0"},
    ]
    for cat in CATEGORIES:
        urls.append({
            "loc": f"{SITE_URL}/category.html?cat={cat}",
            "lastmod": today_str(),
            "changefreq": "hourly",
            "priority": "0.9"
        })
    for art in articles:
        urls.append({
            "loc": f"{SITE_URL}/articles/{art['slug']}.html",
            "lastmod": art["published_at"][:10],
            "changefreq": "daily",
            "priority": "0.8"
        })
    for page in ["about.html", "privacy.html", "terms.html", "contact.html"]:
        urls.append({
            "loc": f"{SITE_URL}/{page}",
            "lastmod": today_str(),
            "changefreq": "monthly",
            "priority": "0.4"
        })

    xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for u in urls:
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{u['loc']}</loc>")
        xml_lines.append(f"    <lastmod>{u['lastmod']}</lastmod>")
        xml_lines.append(f"    <changefreq>{u['changefreq']}</changefreq>")
        xml_lines.append(f"    <priority>{u['priority']}</priority>")
        xml_lines.append("  </url>")
    xml_lines.append("</urlset>")

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines))
    log.info(f"Sitemap updated with {len(urls)} URLs")

# ---------------------------------------------------------------------------
# 7. INDEXNOW (Bing instant indexing)
# ---------------------------------------------------------------------------

def ping_indexnow(urls_list):
    """Submit URLs to Bing IndexNow for rapid indexing."""
    key = env("BING_INDEXNOW_KEY")
    if not key:
        log.warning("BING_INDEXNOW_KEY not set, skipping IndexNow")
        return

    # Write the key file
    key_path = Path(f"{key}.txt")
    with open(key_path, "w") as f:
        f.write(key)

    payload = json.dumps({
        "host": "toolsfast.online",
        "key": key,
        "keyLocation": f"{SITE_URL}/{key}.txt",
        "urlList": urls_list[:10000]
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            "https://api.indexnow.org/IndexNow",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
        log.info(f"IndexNow pinged {len(urls_list)} URLs, status: {status}")
    except Exception as e:
        log.warning(f"IndexNow ping failed: {e}")

# ---------------------------------------------------------------------------
# 8. MAIN PIPELINE
# ---------------------------------------------------------------------------

def main():
    log.info("=" * 60)
    log.info("ToolsFast News Engine v2.0 - Starting pipeline")
    log.info("=" * 60)

    # Load existing articles
    articles_db = load_json(DATA_FILE)
    existing_slugs = {a["slug"] for a in articles_db}
    log.info(f"Existing articles in database: {len(articles_db)}")

    # Load template
    if not TEMPLATE_FILE.exists():
        log.error(f"Template file not found: {TEMPLATE_FILE}")
        sys.exit(1)
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        template_html = f.read()

    # Step 1: Gather topics
    log.info("Step 1: Gathering topics from multiple sources...")
    topics = gather_topics()
    if not topics:
        log.warning("No topics found from any source. Exiting.")
        return

    # Step 2: Select best topics
    selected = select_topics(topics, existing_slugs)
    log.info(f"Selected {len(selected)} topics for article generation")

    if not selected:
        log.info("No new topics to write about. Cleaning up and exiting.")
        cleanup_old_images()
        return

    # Step 3: Generate and publish articles
    new_articles = []
    new_urls = []

    for i, topic in enumerate(selected):
        log.info(f"\n--- Article {i + 1}/{len(selected)} ---")
        title = topic.get("title", "")
        description = topic.get("description", "")
        category = topic.get("category", "world")

        # Generate headline
        headline = generate_headline(title, category)
        article_slug = slug(headline) + "-" + sha256(headline)
        log.info(f"Headline: {headline}")
        log.info(f"Slug: {article_slug}")
        log.info(f"Category: {category}")

        # Check for duplicate
        if article_slug in existing_slugs:
            log.info("Duplicate slug detected, skipping")
            continue

        # Generate content
        log.info("Generating article content...")
        content = generate_article_content(headline, description, category)
        if not content:
            log.error("Content generation failed, skipping this topic")
            continue

        wc = word_count(content)
        log.info(f"Word count: {wc}")

        # Get image
        image_url = get_article_image(headline, category)

        # Generate tags
        tags = [t.strip() for t in (topic.get("tags", "").split(",") if isinstance(topic.get("tags"), str) else [])]
        if not tags:
            tags = [CATEGORY_LABELS.get(category, "news").lower(), "analysis", "breaking news", "2026"]
            title_words = [w.lower() for w in headline.split() if len(w) > 4][:5]
            tags.extend(title_words)
        tags = list(set(tags))[:15]

        # Generate LSI keywords
        lsi_keywords = generate_lsi_keywords(headline, content, category, tags)

        # Build article data
        author = random.choice(AUTHORS)
        article_data = {
            "slug": article_slug,
            "title": headline,
            "excerpt": generate_excerpt(headline, content),
            "content": content,
            "category": category,
            "author": author,
            "image": image_url,
            "tags": tags,
            "word_count": wc,
            "views": 0,
            "is_featured": i == 0,
            "is_breaking": i == 0,
            "is_viral": False,
            "published_at": now_iso(),
            "seo_score": random.randint(85, 98),
            "lsi_keywords_count": len(lsi_keywords),
            "lsi_keywords": lsi_keywords
        }

        # Publish
        filepath = publish_article(article_data, template_html)

        # Save to database (without full LSI list for storage efficiency)
        db_entry = {k: v for k, v in article_data.items() if k != "lsi_keywords"}
        articles_db.insert(0, db_entry)
        existing_slugs.add(article_slug)
        new_articles.append(db_entry)
        new_urls.append(f"{SITE_URL}/articles/{article_slug}.html")

        log.info(f"Article published successfully: {headline[:60]}...")

        # Brief pause between articles
        if i < len(selected) - 1:
            time.sleep(2)

    # Step 4: Save updated database
    save_json(DATA_FILE, articles_db)
    log.info(f"Database updated: {len(articles_db)} total articles")

    # Step 5: Update sitemap
    update_sitemap(articles_db)

    # Step 6: Ping IndexNow
    if new_urls:
        all_urls = [f"{SITE_URL}/", f"{SITE_URL}/sitemap.xml"] + new_urls
        ping_indexnow(all_urls)

    # Step 7: Cleanup old images
    cleanup_old_images()

    log.info("\n" + "=" * 60)
    log.info(f"Pipeline complete. Published {len(new_articles)} new articles.")
    log.info("=" * 60)


if __name__ == "__main__":
    main()
