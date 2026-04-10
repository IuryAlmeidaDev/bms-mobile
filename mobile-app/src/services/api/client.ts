import axios from "axios";

import { API_BASE_URL } from "../../constants/config";

let accessToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function registerUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipReset = error.config?.headers?.["x-skip-auth-reset"];
    if (error.response?.status === 401 && !skipReset) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);
