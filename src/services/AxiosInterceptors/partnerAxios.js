import axios from "axios";

const baseURL = process.env.REACT_APP_SERVERURL;

export const partnerAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

partnerAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("partnerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
