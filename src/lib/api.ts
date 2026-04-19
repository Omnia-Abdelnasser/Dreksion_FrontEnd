import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});