import axios from 'axios';

import { AuthTokenStorage } from '../../features/auth/storages/AuthTokenStorage';

export const habitsApi = axios.create({
  baseURL: process.env.HABITS_API_URL,
});

habitsApi.interceptors.request.use(config => {
  const authToken = AuthTokenStorage.get();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken.accessToken}`;
  }

  return config;
});
