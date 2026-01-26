import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://supermarket-pro-server-ruvi-ruby7966-dev.apps.rm2.thpm.p1.openshiftapps.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically to every request (server auth uses Authorization: Bearer <token>)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
