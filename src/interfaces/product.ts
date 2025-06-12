export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface ApiProduct {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  region_id: string;
  images: string[];
  briefHistory: string;
  status: 'available' | 'out of stock' | string;
  created_at: string | FirestoreTimestamp;
}

export interface PaginatedProductsResponse {
  data: ApiProduct[];
  total: number;
  page: number;
  limit: number;
}