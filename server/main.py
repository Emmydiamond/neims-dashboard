import os
from dotenv import load_dotenv
load_dotenv()
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import requests

from graph_engine import analyze_news, generate_graph, get_boss_insights, get_party_power_map
app = FastAPI()

API_KEY = os.getenv("NEWS_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "NEIMS Backend Running"}


@app.get("/news")
def get_news():

    url = (
        f"https://newsapi.org/v2/everything?"
        f"q=Nigeria"
        f"&language=en"
        f"&sortBy=publishedAt"
        f"&apiKey={API_KEY}"
    )

    response = requests.get(url, verify=False, timeout=10)
    data = response.json()

    print(data)

    articles = []

    for article in data.get("articles", [])[:10]:

        title = article.get("title", "")
        description = article.get("description", "")

        full_text = f"{title}. {description}"

        graph_data = analyze_news(full_text)

        score = graph_data["sentiment"]

        if score >= 0.05:
            sentiment = "positive"
        elif score <= -0.05:
            sentiment = "negative"
        else:
            sentiment = "neutral"

        articles.append({
            "title": title,
            "description": description,
            "source": article["source"]["name"],
            "publishedAt": article["publishedAt"],
            "url": article["url"],
            "entities": graph_data["entities"],
            "sentiment": sentiment,
            "sentiment_score": score
        })

    if len(articles) > 0:
        generate_graph()

    return {
        "status": "success",
        "total_articles": len(articles),
        "articles": articles
    }

from fastapi.responses import HTMLResponse

@app.get("/graph")
def get_graph():
    with open("knowledge_graph.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/party-map")
def party_map():
    return get_party_power_map()

@app.get("/insights")
def insights():
    try:
        return get_boss_insights()
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/test")
def test():
    return {"status": "ok"}
@app.get("/ping")
def ping():
    return {"status": "alive"}