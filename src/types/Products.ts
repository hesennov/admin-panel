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
  totalPage: number;
  page: number;
  limit: number;
}

export interface EditProduct {
  id: number;
  title?: string;
  price?: number;
  stock?: number;
}
