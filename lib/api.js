const BASE_URL = "http://127.0.0.1:8000";

export const getNews = async () => {
  const res = await fetch(`${BASE_URL}/news`);
  return res.json();
};

export const getInsights = async () => {
  const res = await fetch(`${BASE_URL}/insights`);
  return res.json();
};

export const getPartyMap = async () => {
  const res = await fetch(`${BASE_URL}/party-map`);
  return res.json();
};

export const getGraph = `${BASE_URL}/graph`;