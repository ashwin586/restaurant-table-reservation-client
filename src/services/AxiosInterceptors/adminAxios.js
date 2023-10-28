import axios from "axios";

const baseURL = process.env.REACT_APP_SERVERURL;

export const adminAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


