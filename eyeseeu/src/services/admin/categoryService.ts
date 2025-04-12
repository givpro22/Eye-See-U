import api from '../api';

export const fetchCategories = () => api.get('/categories');
export const createCategory = (name: string) => api.post('/categories', { name });
export const updateCategory = (id: number, name: string) => api.put(`/categories/${id}`, { name });
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);
