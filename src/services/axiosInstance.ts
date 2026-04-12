import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // console.log('Request Interceptor - Config:', store.getState());
  const tokenFromStore = store.getState().login.authToken;
  //console.log('Request Interceptor - Token from Store:', tokenFromStore);
  const tokenFromLocalStorage = localStorage.getItem('authToken');
  //console.log('Request Interceptor - Token from tokenFromLocalStorage:', tokenFromLocalStorage);
  const token = tokenFromStore || tokenFromLocalStorage || undefined;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getPathFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (error) {
    console.error('Invalid URL:', url);
    return '';
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('Error Interceptor:', error);
    // Check if the error is for appointments endpoint and return mock data
    if (error.config && error.config.url) {
      const path = getPathFromUrl(error.config.url);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
