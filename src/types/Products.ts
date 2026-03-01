export interface Products {
  id: number;
  title: string;
  price: number;
  stock: number;
  category?: string;
}

export interface ProductResponse {
  data: Products[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface EditProduct {
  title?: string;
  price?: number;
  stock?: number;
}
