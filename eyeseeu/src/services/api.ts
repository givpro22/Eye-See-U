import axios from 'axios';

const api = axios.create({
    // import.meta.env.VITE_API_BASE_URL || 

  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 필요 시 (세션/쿠키 기반 인증이면)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


