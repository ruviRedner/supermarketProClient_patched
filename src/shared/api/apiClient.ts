import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically to every request (server auth uses Authorization: Bearer <token>)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    // @ts-expect-error axios header typing varies by version
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
