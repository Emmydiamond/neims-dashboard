import { auth, provider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [insights, setInsights] = useState({});
  const [partyMap, setPartyMap] = useState({});
  const [articles, setArticles] = useState([]);

  // AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // LOGIN
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // LOGOUT (FIXED)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // FETCH DATA
  useEffect(() => {
    fetch("https://neims-dashboard-2.onrender.com/news")
      .then((res) => res.json())
      .then((data) => setArticles(data?.articles || []))
      .catch((err) => console.error(err));

    fetch("https://neims-dashboard-2.onrender.com/party-map")
      .then((res) => res.json())
      .then((data) => setPartyMap(data || {}))
      .catch((err) => console.error(err));

    fetch("https://neims-dashboard-2.onrender.com/insights")
      .then((res) => res.json())
      .then((data) => setInsights(data || {}))
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={styles.login}>
        <h1>NEIMS Intelligence System</h1>
        <button onClick={handleLogin} style={styles.button}>
          Sign in with Google
        </button>
      </div>
    );
  }

  const positiveCount = articles.filter(a => a.sentiment === "positive").length;
  const negativeCount = articles.filter(a => a.sentiment === "negative").length;
  const neutralCount = articles.filter(a => a.sentiment === "neutral").length;

  return (
    <div style={styles.app}>

      <div style={styles.sidebar}>
        <h2>NEIMS</h2>

        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>News Intelligence</li>
          <li>Political Risk</li>
          <li>Entity Graph</li>
        </ul>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={styles.main}>
        <h1>🇳🇬 NEIMS Dashboard</h1>

        <div style={styles.kpiGrid}>
          <div style={styles.card}>Total: {articles.length}</div>
          <div style={styles.green}>Positive: {positiveCount}</div>
          <div style={styles.red}>Negative: {negativeCount}</div>
          <div style={styles.gray}>Neutral: {neutralCount}</div>
        </div>

        <div style={styles.panel}>
          <h2>Election Pressure Index</h2>
          <h1>{insights?.election_pressure_score ?? 0}</h1>
        </div>

        <div style={styles.panel}>
          <h2>Party Influence</h2>
          {Object.entries(partyMap || {}).map(([party, info]) => (
            <div key={party} style={styles.row}>
              <span>{party}</span>
              <span>{info?.mentions || 0}</span>
            </div>
          ))}
        </div>

        <iframe
          src="https://neims-dashboard-2.onrender.com/graph"
          width="100%"
          height="500"
          style={styles.iframe}
          title="graph"
        />

        <h2>Live News</h2>

        <div style={styles.newsGrid}>
          {articles.map((a, i) => (
            <div key={i} style={styles.newsCard}>
              <h3>{a.title}</h3>
              <p>{a.sentiment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },

  login: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },

  button: { padding: "10px 20px", marginTop: "20px" },

  app: { display: "flex", fontFamily: "Arial" },

  sidebar: {
    width: "220px",
    background: "#020617",
    color: "white",
    padding: "20px",
  },

  menu: { listStyle: "none", padding: 0 },

  logout: {
    marginTop: "20px",
    padding: "10px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "20px",
    background: "#0f172a",
    color: "white",
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "10px",
  },

  card: { background: "#1e293b", padding: "10px" },
  green: { background: "#14532d", padding: "10px" },
  red: { background: "#7f1d1d", padding: "10px" },
  gray: { background: "#334155", padding: "10px" },

  panel: { marginTop: "20px", background: "#1e293b", padding: "10px" },

  row: { display: "flex", justifyContent: "space-between" },

  iframe: { border: "none", marginTop: "20px" },

  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
  },

  newsCard: { background: "#1e293b", padding: "10px" },
};

export default App;