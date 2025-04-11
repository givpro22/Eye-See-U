import api from '../api';

export interface ProductInfo {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  state: 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
  picture: string | null;
}

export const fetchAllMenus = async (): Promise<ProductInfo[]> => {
  const response = await api.get('/products');
  return response.data;
};
