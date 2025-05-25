import api from '../api';

export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string | null;
  state: 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
  categoryId: number;
}

export interface NewProductPayload {
  categoryId: number;
  optionGroups: number[];
  name: string;
  description: string;
  price: number;
  state: 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
  picture?: string;
}

export const fetchAdminProducts = async (): Promise<NewProductPayload[]> => {
  const response = await api.get('/products'); // 쿠키 포함되어야 하므로 api.ts에서 withCredentials: true 설정
  return response.data;
};

export const createProduct = async (productData: NewProductPayload): Promise<AdminProduct> => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id: number,updatedData: NewProductPayload): Promise<AdminProduct> => {
  const response = await api.patch(`/products/${id}`, updatedData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};