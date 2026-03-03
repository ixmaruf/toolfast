#!/usr/bin/env python3
import os, sys, json, time, random, hashlib, re, urllib.request, urllib.parse, logging
from datetime import datetime, timezone
from pathlib import Path

# Configuration
SITE_URL = "https://toolsfast.online"
ARTICLES_DIR = Path("news")
DATA_FILE = Path("data/articles.json")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("toolsfast")

def env(key, default=""): return os.environ.get(key, default)
def slug(text): return re.sub(r"[^a-z0-9]+", "-", text.lower().strip()).strip("-")[:80]
def sha256(text): return hashlib.sha256(text.encode()).hexdigest()[:8]

def call_gemini(prompt):
    key = env("GEMINI_API_KEY")
    if not key: return None
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={key}"
    payload = json.dumps({"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"maxOutputTokens": 8192}}).encode("utf-8")
    try:
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        log.warning(f"Gemini API Error: {e}")
        return None

def gather_topics():
    try:
        req = urllib.request.Request("https://feeds.bbci.co.uk/news/world/rss.xml", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8')
            titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', content)
            return [{"title": t, "category": "world"} for t in titles[2:5]]
    except:
        return [{"title": "Global Market Volatility in 2026", "category": "finance"}]

def main():
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    articles_db = []
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f: articles_db = json.load(f)
    
    existing_slugs = {a["slug"] for a in articles_db}
    topics = gather_topics()
    
    for topic in topics:
        title = topic["title"]
        article_slug = slug(title) + "-" + sha256(title)
        if article_slug in existing_slugs: continue
        
        prompt = f"Write a 3000-word investigative report on: {title}. Use HTML tags (h2, p, ul). Professional English only."
        content = call_gemini(prompt)
        if not content: continue

        image = f"https://source.unsplash.com/featured/1200x800?news,{topic['category']}&sig={random.randint(1,999)}"
        
        article_data = {
            "slug": article_slug, "title": title, "category": topic["category"],
            "author": "Editorial Team", "image": image, "content": content,
            "published_at": datetime.now(timezone.utc).isoformat()
        }
        
        with open(ARTICLES_DIR / f"{article_slug}.html", "w", encoding="utf-8") as f:
            f.write(f"<!DOCTYPE html><html><head><title>{title}</title></head><body>{content}</body></html>")
            
        articles_db.insert(0, article_data)
        log.info(f"Published: {title}")

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(articles_db[:50], f, indent=2)

if __name__ == "__main__": main()
