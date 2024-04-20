import axios from 'axios';

import { AccessTokenStorage } from '../../features/auth/storages/AccessTokenStorage';

export const habitsApi = axios.create({
  baseURL: process.env.HABITS_API_URL,
});

habitsApi.interceptors.request.use(config => {
  const accessToken = AccessTokenStorage.get();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
  }

  return config;
});
