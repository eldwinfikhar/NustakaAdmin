import api from '../utils/api';
import { PaginatedOrdersResponse } from '../interfaces/order';

export const fetchOrders = async (): Promise<PaginatedOrdersResponse> => {
  const { data } = await api.get<PaginatedOrdersResponse>('/orders');
  return data;
};