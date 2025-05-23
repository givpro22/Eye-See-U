import api from '../api';

interface RegisterPayload {
  email: string;
  password: string;
  storeName: string;
  name: string;
}

interface LoginResponse {
  email: string;
  storeName: string;
}

export const registerAdmin = (data: RegisterPayload) => {
  return api.post('/user/signup', data);
};

export const loginAdmin = (email: string, password: string) => {
  return api.post<LoginResponse>('/user/login', { email, password });
};

