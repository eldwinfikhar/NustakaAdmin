export interface UserWithId {
    id: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    role: 'buyer' | 'seller' | 'admin';
    status?: 'active' | 'inactive' | 'banned';
    created_at?: string;
    updated_at?: string;
  }