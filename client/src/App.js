import { useEffect, useState } from "react";

function App() {
  const [insights, setInsights] = useState({});
  const [partyMap, setPartyMap] = useState({});

  const [articles, setArticles] = useState([]);

  const positiveCount = articles.filter(
  (article) => article.sentiment === "positive"
).length;

const negativeCount = articles.filter(
  (article) => article.sentiment === "negative"
).length;

const neutralCount = articles.filter(
  (article) => article.sentiment === "neutral"
).length;


  // Fetch news from FastAPI backend
  useEffect(() => {

    fetch("http://127.0.0.1:8000/news")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles || []);      
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
      fetch("http://127.0.0.1:8000/party-map")
        .then((res) => res.json())
        .then((data) => setPartyMap(data));

      fetch("http://127.0.0.1:8000/insights")
        .then((res) => res.json())
        .then((data) => setInsights(data));

      }, []);

  return (
    <div style={styles.app}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>NEIMS</h2>

        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Predictions</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}

      <div style={{
  display: "flex",
  gap: "20px",
  marginTop: "30px",
  flexWrap: "wrap"
}}>

  {Object.entries(partyMap).map(([party, info]) => (

    <div
      key={party}
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "220px"
      }}
    >
      <h2>{party}</h2>

      <p>
        <strong>Mentions:</strong> {info.mentions}
      </p>

      <p>
        <strong>Avg Sentiment:</strong> {info.avg_sentiment}
      </p>

    </div>

  ))}

</div>
      <div style={styles.main}>
        <h1 style={styles.title}>NEIMS Live Intelligence Feed</h1>
      <div style={{marginBottom: "25px", display: "flex",gap: "20px",flexWrap: "wrap"
      }}>

        <h3 style={{ background: "#1e293b", padding: "10px", borderRadius: "8px" }}>
       Total Articles: {articles.length}
        </h3>

        <h3 style={{ background: "#1e293b", padding: "10px", borderRadius: "8px" }}>
       Positive: {positiveCount}
        </h3>

        <h3 style={{ background: "#1e293b", padding: "10px", borderRadius: "8px" }}>
       Negative: {negativeCount}
        </h3>

        <h3 style={{ background: "#1e293b", padding: "10px", borderRadius: "8px" }}>
       Neutral: {neutralCount}
        </h3>

      </div>

        <div style={styles.newsContainer}>

          <div
       style={{
       marginTop: "30px",
       background: "#7f1d1d",
       padding: "25px",
       borderRadius: "14px",
       color: "white"
       }}
       >
       <h2>Election Pressure Meter</h2>

       <h1 style={{ fontSize: "48px" }}>
       {insights.election_pressure_score}
       </h1>

       <p>
       Higher values indicate rising political tension,instability, protests, violence, or negative sentiment.
       </p>
       </div>

          {articles.map((article, index) => (
            <div key={index} style={styles.card}>
              <h3>{article.title}</h3>

              <p>
                <strong>Source:</strong> {article.source}
              </p>

              <p>
                <strong>Published:</strong> {article.publishedAt}
              </p>
              <p>
                <strong>Sentiment:</strong> {article.sentiment}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                Read Full Article
              </a>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

const styles = {

  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "250px",
    backgroundColor: "#020617",
    color: "white",
    padding: "30px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "40px",
    lineHeight: "2",
  },

  main: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: "40px",
    color: "white",
    overflowY: "auto",
  },

  title: {
    marginBottom: "30px",
    fontSize: "36px",
  },

  newsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
  },
};

<div style={{ marginTop: "40px" }}>
  <h2>Political Knowledge Graph</h2>

  <iframe
    src="http://127.0.0.1:8000/graph"
    title="Knowledge Graph"
    width="100%"
    height="800px"
    style={{
      border: "none",
      borderRadius: "12px",
      background: "#fff"
    }}
  />
</div>


export default App;