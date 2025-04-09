import axios from 'axios';

const api = axios.create({
    // import.meta.env.VITE_API_BASE_URL || 

  baseURL: 'https://1dd3232e-2d54-4c6f-9373-3946b8a58d7b.mock.pstmn.io/api',
  // withCredentials: true, // 필요 시 (세션/쿠키 기반 인증이면)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


