#!/usr/bin/env python3
"""
ToolsFast News Engine - Multi-API Fallback & Trends Integration
================================================================
1. Gemini API fallback to Groq API.
2. AI generation fallback to raw Google Trends / RSS descriptions.
"""
import os, sys, json, time, random, hashlib, re, urllib.request, urllib.parse, logging
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

# --- Configuration ---
SITE_URL = "https://toolsfast.online"
ARTICLES_DIR = Path("news")
DATA_FILE = Path("data/articles.json")
LOG_FILE = Path("logs/engine.log")

LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s",
                    handlers=[logging.FileHandler(LOG_FILE, encoding="utf-8"), logging.StreamHandler(sys.stdout)])
log = logging.getLogger("toolsfast")

def env(key, default=""): return os.environ.get(key, default)
def slug(text): return re.sub(r"[^a-z0-9]+", "-", text.lower().strip()).strip("-")[:80]
def sha256(text): return hashlib.sha256(text.encode()).hexdigest()[:8]

def call_gemini(prompt):
    key = env("GEMINI_API_KEY")
    if not key: return None
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={key}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.8, "maxOutputTokens": 8192}
    }).encode("utf-8")
    try:
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        log.warning(f"Gemini API Error: {e}")
        return None

def call_groq(prompt):
    key = env("GROQ_KEY_1") or env("GROQ_KEY_2")
    if not key: return None
    url = "https://api.groq.com/openai/v1/chat/completions"
    payload = json.dumps({
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 6000
    }).encode("utf-8")
    try:
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"}, method="POST")
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["choices"][0]["message"]["content"]
    except Exception as e:
        log.warning(f"Groq API Error: {e}")
        return None

def fetch_google_trends():
    try:
        req = urllib.request.Request("https://trends.google.com/trending/rss?geo=US", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            tree = ET.fromstring(resp.read())
            items = []
            for item in tree.iter("item"):
                title = item.findtext("title", "")
                desc = item.findtext("description", "")
                if title: items.append({"title": title, "description": desc, "category": "trending"})
            return items[:3]
    except Exception as e:
        log.warning(f"Google Trends Error: {e}")
        return []

def fetch_rss_fallback():
    try:
        req = urllib.request.Request("https://feeds.bbci.co.uk/news/world/rss.xml", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read().decode('utf-8')
            titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', content)
            descs = re.findall(r'<description><!\[CDATA\[(.*?)\]\]></description>', content)
            items = []
            for i in range(min(3, len(titles))):
                items.append({
                    "title": titles[i], 
                    "description": descs[i] if i < len(descs) else "Updates emerging on this story.", 
                    "category": "world"
                })
            return items
    except:
        return []

def generate_deep_article(title, category, raw_desc):
    prompt = f"Write a comprehensive 2000-word investigative news report on: '{title}'. Category: {category}. Include H2 headings, paragraphs, and lists. Output strictly in HTML format (<h2>, <p>, <ul>). Do not use Markdown."
    
    # 1. Try Gemini First
    log.info("Attempting Gemini API...")
    content = call_gemini(prompt)
    if content and len(content) > 500:
        return content.replace("```html", "").replace("```", "").strip()
        
    # 2. Fallback to Groq
    log.warning("Gemini failed or returned short text. Attempting Groq API...")
    content = call_groq(prompt)
    if content and len(content) > 500:
        return content.replace("```html", "").replace("```", "").strip()
        
    # 3. Fallback to Raw Source Data (Trends/RSS)
    log.error("All AI generation failed. Using raw data fallback.")
    clean_desc = re.sub(r"<[^>]*>", "", raw_desc)
    return f"<h2>Breaking Update</h2><p>{clean_desc}</p><p><em>Our automated systems are currently experiencing high volume. A full, detailed report on this topic will be generated and published shortly.</em></p>"

def get_unique_image(title):
    search_terms = urllib.parse.quote(title.split()[0] + "," + title.split()[-1])
    return f"https://source.unsplash.com/featured/1200x800?{search_terms}&sig={random.randint(1,9999)}"

def main():
    log.info("Starting Multi-API Engine Cycle...")
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f: articles_db = json.load(f)
    else: articles_db = []
    
    existing_slugs = {a["slug"] for a in articles_db}
    
    # Fetch Data
    topics = fetch_google_trends()
    if not topics:
        topics = fetch_rss_fallback()
        
    for topic in topics:
        title = topic["title"]
        article_slug = slug(title) + "-" + sha256(title)
        
        if article_slug in existing_slugs: continue
        
        log.info(f"Processing: {title}")
        content = generate_deep_article(title, topic["category"], topic.get("description", ""))
        image_url = get_unique_image(title)
        tags = [topic["category"], "breaking", "update", "2026"]
        
        article_data = {
            "slug": article_slug, "title": title, "category": topic["category"],
            "author": "ToolsFast Engine", "image": image_url, "content": content,
            "tags": tags, "published_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Save HTML
        with open(ARTICLES_DIR / f"{article_slug}.html", "w", encoding="utf-8") as f:
            f.write(f"<!DOCTYPE html><html><head><title>{title}</title><style>body{{font-family:'Inter',sans-serif;max-width:900px;margin:auto;padding:40px;line-height:1.8;color:#222;}}img{{width:100%;border-radius:15px;}}h2{{color:#0a3d62;margin-top:40px;}}</style></head><body><a href='/'>← Back</a><h1>{title}</h1><img src='{image_url}'><div class='meta'>By ToolsFast Editorial | {datetime.now().strftime('%B %d, %Y')}</div><hr>{content}</body></html>")
            
        articles_db.insert(0, article_data)
        log.info(f"Successfully published: {article_slug}")

    # Save Database
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(articles_db[:50], f, indent=2)
    log.info("Engine Cycle Complete.")

if __name__ == "__main__": main()
