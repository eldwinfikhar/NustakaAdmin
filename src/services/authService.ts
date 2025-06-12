import api from '../utils/api';

export interface LoginResponse {
  token: string;
  user: { id: string; role: string; username: string; };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/users/login', {
    email,
    password
  });
  return data;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/users/logout');
    console.log('Successfully logged out from server');
  } catch (error) {
    console.error('API logout error:', error);
    throw error;
  }
};