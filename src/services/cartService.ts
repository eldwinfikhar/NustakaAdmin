import api from '../utils/api';
import { ApiCartItem, CartApiResponse } from '../interfaces/cart';

export const fetchCartItems = async (): Promise<CartApiResponse> => {
  const { data } = await api.get<CartApiResponse>('/cart');
  return data;
};

export const deleteCartItem = async (cartItemId: string): Promise<void> => {
  await api.delete(`/cart/${cartItemId}`);
};

export const addProductToCart = async (productId: string, quantity: number): Promise<ApiCartItem> => {
  const { data } = await api.post<ApiCartItem>('/cart', { product_id: productId, quantity });
  return data;
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number): Promise<{ success: boolean }> => {
  const { data } = await api.put<{ success: boolean }>(`/cart/${cartItemId}`, { quantity });
  return data;
};