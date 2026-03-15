import type { Orders, EditOrders, OrdersResponse } from "../types/orders";
import apiClient from "../api/client";

interface ParamsProp {
  page?: number;
  limit?: number;
  search?: string;
}

export const orderService = {
  getall: (params: ParamsProp = {}): Promise<OrdersResponse> => {
    return apiClient.get("/orders", { params });
  },
  getById: (id: number): Promise<Orders> => {
    return apiClient.get(`/orders/${id}`);
  },
  post: (id:number,data:EditOrders):Promise<Orders> => {
    return apiClient.put(`/orders/${id}, ${data}`)
  },
  delete: (id:number):Promise<Orders> => {
    return apiClient.delete(`/orders/${id}`)
  }
};
