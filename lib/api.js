const BASE_URL = "https://neims-dashboard-2.onrender.com";

export const getNews = async () => {
  const res = await fetch(`${BASE_URL}/news`);
  return res.json();
};

export const getPartyMap = async () => {
  const res = await fetch(`${BASE_URL}/party-map`);
  return res.json();
};

export const getGraph = async () => {
  const res = await fetch(`${BASE_URL}/graph`);
  return res.json();
};