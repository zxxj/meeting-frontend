import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000,
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    return error.response;
  },
);
