export interface Orders {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface EditOrders {
  userId?: number;
  productId?: number;
  quantity?: number;
  totalPrice?: number;
  status?: string;
  createdAt?: string;
}

export interface OrdersResponse {
  data: [];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
