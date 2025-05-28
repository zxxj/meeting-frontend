import { getTwoToken } from '@/utils/getToken';
import axios from 'axios';
import { refreshToken } from './modules/user';
import { setItem } from '@/utils/local';

export const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000,
});

http.interceptors.request.use((config) => {
  const accessToken = getTwoToken().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    console.log('response response response', response);
    return response.data;
  },

  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    console.log(error.response);
    let { data, config } = error.response;

    if (data.code === 401 && config.url.includes('/user/refresh')) {
      const res = await refreshToken();

      setItem('access_token', res.data.access_token || '');
      setItem('refresh_token', res.data.refresh_token || '');
    } else {
      return error.response;
    }
  },
);
