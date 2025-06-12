import api from '../utils/api';
import { ApiProduct, PaginatedProductsResponse } from '../interfaces/product';

export const fetchProducts = async (): Promise<PaginatedProductsResponse> => {
  const { data } = await api.get<PaginatedProductsResponse>('/products/');
  return data;
};

export const searchProducts = async (query: string): Promise<ApiProduct[]> => {
  const { data } = await api.get<ApiProduct[]>(`/products/search?query=${query}`);
  return data;
};

export const createProduct = async (productData: Omit<ApiProduct, 'id' | 'seller_id' | 'status' | 'created_at'>): Promise<ApiProduct> => {
  const { data } = await api.post<ApiProduct>('/products', productData);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};