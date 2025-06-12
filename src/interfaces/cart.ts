export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface ApiCartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price_per_item: number;
  added_at: string | FirestoreTimestamp;
}

export interface CartApiResponse {
  data: ApiCartItem[];
}