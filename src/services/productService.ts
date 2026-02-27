import type { Products, ProductResponse, EditProduct } from "../types/Products";
import apiClient from "../api/client";

interface ParamsProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const productService = {
  gettAll: (params: ParamsProps = {}): Promise<ProductResponse> => {
    return apiClient.get("/products", { params });
  },
  getById: (id: number): Promise<Products> => {
    return apiClient.get(`/products/${id}`);
  },
  put: (id: number, data: EditProduct): Promise<Products> => {
    return apiClient.put(`/products/${id}`, data);
  },
  delete: (id: number): Promise<Products> => {
    return apiClient.delete(`/products/${id}`);
  },
};
