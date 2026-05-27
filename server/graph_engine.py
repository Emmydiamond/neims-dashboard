from collections import defaultdict
import spacy
import networkx as nx
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from pyvis.network import Network

# -----------------------------
# GLOBAL TRACKERS
# -----------------------------
entity_frequency = defaultdict(int)
sentiment_tracker = defaultdict(list)
party_sentiment = defaultdict(list)

graph = nx.Graph()

# -----------------------------
# ENTITY CLASSIFICATION
# -----------------------------
POLITICIANS = {"TINUBU", "ATIKU", "EL-RUFAI"}
PARTIES = {"APC", "PDP", "LP"}
INSTITUTIONS = {"INEC", "POLICE", "GOVERNMENT"}


def get_entity_type(name: str):
    name = name.upper()

    if name in POLITICIANS:
        return "politician"
    elif name in PARTIES:
        return "party"
    elif name in INSTITUTIONS:
        return "institution"
    else:
        return "other"


# -----------------------------
# NLP SETUP
# -----------------------------
nlp = spacy.load("en_core_web_sm")
analyzer = SentimentIntensityAnalyzer()


# -----------------------------
# MAIN ANALYSIS FUNCTION
# -----------------------------
def analyze_news(article_text: str):

    doc = nlp(article_text)

    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    sentiment = analyzer.polarity_scores(article_text)
    compound = sentiment["compound"]

    # -----------------------------
    # PROCESS ENTITIES
    # -----------------------------
    for entity in entities:

        node_name = entity["text"].strip()
        entity_type = get_entity_type(node_name)

        # tracking
        entity_frequency[node_name] += 1
        sentiment_tracker[node_name].append(compound)

        # party tracking
        if entity_type == "party":
            party_sentiment[node_name.upper()].append(compound)

        # graph nodes
        if not graph.has_node(node_name):
            graph.add_node(
                node_name,
                type=entity_type,
                sentiment=compound,
                weight=1
            )
        else:
            graph.nodes[node_name]["weight"] += 1

    # -----------------------------
    # CREATE RELATIONSHIPS
    # -----------------------------
    for i in range(len(entities)):
        for j in range(i + 1, len(entities)):

            node1 = entities[i]["text"].strip()
            node2 = entities[j]["text"].strip()

            if graph.has_edge(node1, node2):
                graph[node1][node2]["weight"] += 1
            else:
                graph.add_edge(node1, node2, weight=1)

    return {
        "entities": entities,
        "sentiment": compound
    }


# -----------------------------
# GRAPH VISUALIZATION
# -----------------------------
def generate_graph():

    net = Network(
        height="750px",
        width="100%",
        bgcolor="#111111",
        font_color="white"
    )

    for node, data in graph.nodes(data=True):

        sentiment = data.get("sentiment", 0)

        if sentiment > 0.05:
            color = "green"
        elif sentiment < -0.05:
            color = "red"
        else:
            color = "gray"

        size = data.get("weight", 1) * 5

        net.add_node(
            node,
            label=node,
            color=color,
            size=size,
            title=f"Type: {data.get('type')}"
        )

    for source, target, data in graph.edges(data=True):

        net.add_edge(
            source,
            target,
            value=data.get("weight", 1)
        )

    net.save_graph("knowledge_graph.html")


# -----------------------------
# INSIGHTS ENGINE (FIXED)
# -----------------------------
def get_boss_insights():

    top_entities = sorted(
        entity_frequency.items(),
        key=lambda x: x[1],
        reverse=True
    )[:10]

    trending = []

    for entity, scores in sentiment_tracker.items():

        if not scores:
            continue

        avg_sentiment = sum(scores) / len(scores)

        trending.append({
            "entity": entity,
            "avg_sentiment": round(avg_sentiment, 3),
            "mentions": len(scores)
        })

    trending = sorted(
        trending,
        key=lambda x: x["mentions"],
        reverse=True
    )[:10]

    total_mentions = sum(entity_frequency.values())

    negative_mentions = sum(
        1 for scores in sentiment_tracker.values()
        for s in scores if s < -0.05
    )

    pressure_score = (
        negative_mentions / total_mentions
        if total_mentions > 0 else 0
    )

    return {
        "top_entities": top_entities,
        "trending_entities": trending,
        "election_pressure_score": round(pressure_score, 3)
    }


# -----------------------------
# PARTY POWER MAP
# -----------------------------
def get_party_power_map():

    result = {}

    for party, scores in party_sentiment.items():

        if not scores:
            continue

        avg_sentiment = sum(scores) / len(scores)

        result[party] = {
            "avg_sentiment": round(avg_sentiment, 3),
            "mentions": len(scores)
        }

    return result