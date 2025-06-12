import api from '../utils/api';
import { UserWithId } from '../interfaces/user';

export const fetchUsers = async (): Promise<UserWithId[]> => {
  const { data } = await api.get<UserWithId[]>('/users');
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
