import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
export const apiForCompany = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiForCompany.interceptors.request.use((config) => {
  const token = localStorage.getItem("companyToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
