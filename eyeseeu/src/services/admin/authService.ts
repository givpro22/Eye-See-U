import api from '../api';

interface RegisterPayload {
  email: string;
  password: string;
  storeName: string;
}

export const registerAdmin = (data: RegisterPayload) => {
  return api.post('/admin/register', data);
};

export const loginAdmin = (email: string, password: string) => {
  return api.post('/admin/login', { email, password });
};
