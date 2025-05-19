import axios from 'axios';

// WOHOO we are using axios for http requests


const baseURL: string = 'https://api.escuelajs.co/api/v1/';
const TIMEOUT: number = 2000;

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// axios configuration
const api = axios.create({
  baseURL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    return Promise.reject(error);
  }
);

export default api;
