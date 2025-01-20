import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
