import axios from 'axios';

import { mmkvStorage } from '../storage/mmkv';

export const habitsApi = axios.create({
  baseURL: process.env.HABITS_API_URL,
});

habitsApi.interceptors.request.use(config => {
  const accessToken = mmkvStorage.getString('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
