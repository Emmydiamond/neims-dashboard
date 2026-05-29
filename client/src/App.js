import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [insights, setInsights] = useState({});
  const [partyMap, setPartyMap] = useState({});
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const handleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  setUser(result.user);
  const handleLogout = async () => {
  await signOut(auth);
  setUser(null);
};
};

  const positiveCount = articles.filter(
    (article) => article.sentiment === "positive"
  ).length;

  const negativeCount = articles.filter(
    (article) => article.sentiment === "negative"
  ).length;

  const neutralCount = articles.filter(
    (article) => article.sentiment === "neutral"
  ).length;

  useEffect(() => {
    fetch("https://neims-dashboard-2.onrender.com/news")
      .then((res) => res.json())
      .then((data) => setArticles(data?.articles || []))
      .catch((err) => console.error("news error:", err));

    fetch("https://neims-dashboard-2.onrender.com/party-map")
      .then((res) => res.json())
      .then((data) => setPartyMap(data || {}))
      .catch((err) => console.error("party-map error:", err));

    fetch("https://neims-dashboard-2.onrender.com/insights")
      .then((res) => res.json())
      .then((data) => setInsights(data || {}))
      .catch((err) => console.error("insights error:", err));
  }, []);
  if (!user) { 
    return ( 
     <div 
       style={{ 
         height: "100vh", 
         display: "flex", 
         flexDirection: "column", 
         justifyContent: "center", 
         alignItems: "center", 
         background: "#0f172a", color: "white", }} >
      <h1>NEIMS Intelligence System</h1>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

  return (
    <div style={styles.app}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>NEIMS</h2>
        <p style={{ fontSize: "12px", opacity: 0.6 }}>
          National Intelligence Dashboard
        </p>

        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>News Intelligence</li>
          <li>Political Risk</li>
          <li>Entity Graph</li>
        </ul>
      </div>
      <button onClick={handleLogout}>
       Logout
      </button>

      {/* Main */}
      <div style={styles.main}>
        <h1 style={styles.title}>🇳🇬 NEIMS Intelligence Dashboard</h1>

        {/* KPI CARDS */}
        <div style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <h3>Total Articles</h3>
            <h1>{articles.length}</h1>
          </div>

          <div style={styles.kpiCardGreen}>
            <h3>Positive Sentiment</h3>
            <h1>{positiveCount}</h1>
          </div>

          <div style={styles.kpiCardRed}>
            <h3>Negative Sentiment</h3>
            <h1>{negativeCount}</h1>
          </div>

          <div style={styles.kpiCardGray}>
            <h3>Neutral</h3>
            <h1>{neutralCount}</h1>
          </div>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          
          {/* INSIGHTS */}
          <div style={styles.panel}>
            <h2>Election Pressure Index</h2>
            <h1 style={{ fontSize: "50px" }}>
              {insights?.election_pressure_score ?? 0}
            </h1>
            <p>Real-time political tension indicator</p>
          </div>

          {/* PARTY MAP */}
          <div style={styles.panel}>
            <h2>Party Influence Map</h2>

            {Object.entries(partyMap || {}).map(([party, info]) => (
              <div key={party} style={styles.partyRow}>
                <strong>{party}</strong>
                <span>{info?.mentions || 0} mentions</span>
              </div>
            ))}
          </div>
        </div>

        {/* GRAPH */}
        <div style={styles.graphPanel}>
          <h2>Knowledge Graph Intelligence</h2>

          <iframe
            src="https://neims-dashboard-2.onrender.com/graph"
            width="100%"
            height="600"
            title="Knowledge Graph"
            style={{ border: "none", borderRadius: "12px" }}
          />
        </div>

        {/* NEWS */}
        <h2 style={{ marginTop: "30px" }}>Live Intelligence Feed</h2>

        <div style={styles.newsGrid}>
          {articles.map((article, index) => (
            <div key={index} style={styles.card}>
              <h3>{article.title}</h3>
              <p>{article.source}</p>
              <p>{article.sentiment}</p>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#38bdf8" }}
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLES */
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
  },

  title: {
    marginBottom: "30px",
    fontSize: "36px",
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  kpiCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },

  kpiCardGreen: {
    background: "#14532d",
    padding: "20px",
    borderRadius: "12px",
  },

  kpiCardRed: {
    background: "#7f1d1d",
    padding: "20px",
    borderRadius: "12px",
  },

  kpiCardGray: {
    background: "#334155",
    padding: "20px",
    borderRadius: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },

  panel: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },

  partyRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  graphPanel: {
    marginTop: "30px",
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
  },

  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },
};

export default App;