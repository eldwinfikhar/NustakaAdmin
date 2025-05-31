// Timestamp dari Firestore bisa diwakili sebagai string atau number di FE
export interface UserWithId {
    id: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    role: 'buyer' | 'seller' | 'admin';
    status?: 'active' | 'inactive' | 'banned';
    created_at?: string;   // ISO string atau Firestore Timestamp as string
    updated_at?: string;
  }

  
  