import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL: string = import.meta.env.VITE_API_BASE_URL;
const timeout: number = Number(import.meta.env.VITE_TIMEOUT) || 5000;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: { "Content-Type": "application-json" },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(` ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("erorororororors 401");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
