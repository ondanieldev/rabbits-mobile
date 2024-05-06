import axios, { AxiosError } from 'axios';

import { AuthTokenStorage } from '../../features/auth/storages/AuthTokenStorage';
import { ErrorHandler } from '../../features/error/services/ErrorHandler';

export const appApi = axios.create({
  baseURL: process.env.APP_API_URL,
});

appApi.interceptors.request.use(config => {
  const authToken = AuthTokenStorage.get();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken.token}`;
  }

  return config;
});

appApi.interceptors.response.use(
  response => response,
  error => {
    if (error instanceof AxiosError) {
      return Promise.reject(ErrorHandler.handleAxiosError(error));
    }
    return Promise.reject(ErrorHandler.handle(error));
  },
);
