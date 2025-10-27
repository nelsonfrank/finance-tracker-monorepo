import axios from 'axios';
import { getSession } from 'next-auth/react';

const MAX_RETRIES = 2;

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`, // Base URL for the API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    const token = session && session.user ? session.user.access_token : '';

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    if (!config._retryCount) config._retryCount = 0;

    const status = error.response?.status;

    const shouldRedirect = config._retryCount >= MAX_RETRIES && status === 401;

    if (shouldRedirect) {
      if (typeof window !== 'undefined') {
        document.cookie = 'auth-failed=true; path=/';
      }
      return Promise.reject(error);
    }

    const shouldRetry = config._retryCount < MAX_RETRIES && (!error.response || status === 401);

    if (shouldRetry) {
      config._retryCount += 1;

      if (status === 401) {
        const newSession = await getSession();

        const newToken = newSession?.user?.access_token;

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          if (typeof window !== 'undefined') {
            document.cookie = 'auth-failed=true; path=/';
          }
          return Promise.reject(error);
        }
      }

      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      await delay(config._retryCount * 1000);

      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;