#!/usr/bin/env python3
import os, json, re, urllib.request, random, hashlib, logging
from datetime import datetime, timezone
from pathlib import Path

# Config
ARTICLES_DIR = Path("news")
DATA_FILE = Path("data/articles.json")

def slug(text): return re.sub(r"[^a-z0-9]+", "-", text.lower().strip()).strip("-")[:80]
def sha256(text): return hashlib.sha256(text.encode()).hexdigest()[:6]

def fetch_rss_news():
    try:
        url = "https://feeds.bbci.co.uk/news/world/rss.xml"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8')
            titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', content)
            descs = re.findall(r'<description><!\[CDATA\[(.*?)\]\]></description>', content)
            items = []
            for i in range(min(5, len(titles))):
                if "BBC News" in titles[i]: continue
                items.append({"title": titles[i], "desc": descs[i] if i < len(descs) else "Latest world news update."})
            return items
    except: return []

def main():
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    articles_db = []
    
    topics = fetch_rss_news()
    if not topics: return

    for topic in topics:
        title = topic["title"]
        article_slug = slug(title) + "-" + sha256(title)
        
        # Create a decent content even without API
        content = f"<h2>Global Report: {title}</h2><p>{topic['desc']}</p><p>Reports are coming in from various international agencies regarding this developing situation in the global landscape. Experts suggest that the implications could be far-reaching, affecting both economic and political stability in the region.</p><p>As the situation unfolds, multiple sources confirm that early assessments point towards a significant shift in current policy frameworks. Further updates are expected as more verified data becomes available through official channels.</p>"
        
        image = f"https://images.unsplash.com/photo-1504711434969-e33886168d7c?w=1200"
        
        article_data = {
            "slug": article_slug, "title": title, "category": "world",
            "author": "Global News Desk", "image": image, "content": content,
            "published_at": datetime.now(timezone.utc).isoformat()
        }
        
        with open(ARTICLES_DIR / f"{article_slug}.html", "w", encoding="utf-8") as f:
            f.write(f"<html><body style='font-family:sans-serif;max-width:800px;margin:auto;padding:40px;'><h1>{title}</h1><img src='{image}' style='width:100%'>{content}</body></html>")
            
        articles_db.insert(0, article_data)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(articles_db[:20], f, indent=2)

if __name__ == "__main__": main()
