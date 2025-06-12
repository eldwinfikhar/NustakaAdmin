export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface ApiBuyerInfo {
  id: string;
  username: string;
  email: string;
}

export interface ApiItemsSummary {
  totalItems: number;
  productNames: string[];
}

export interface ApiOrder {
  id: string;
  buyer_id: string;
  total_amount: number;
  shipping_address: string;
  order_status: string;
  created_at: FirestoreTimestamp | string;
  buyerInfo: ApiBuyerInfo;
  itemsSummary: ApiItemsSummary;
}

export interface PaginatedOrdersResponse {
  data: ApiOrder[];
  total: number;
  page: number;
  limit: number;
}