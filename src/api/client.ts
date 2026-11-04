import axios, { type AxiosRequestConfig } from "axios";
import type { AppStore } from "@/store/store";

let store: AppStore | undefined;

const injectStore = (s: AppStore) => {
  store = s;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = store?.getState().auth.token;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const post = async <TPayload, TResponse>({
  url,
  payload,
  config,
}: {
  url: string;
  payload?: TPayload;
  config?: AxiosRequestConfig;
}): Promise<TResponse> => {
  const { data } = await apiClient.post<TResponse>(url, payload, config);

  return data;
};

export { injectStore, post };
