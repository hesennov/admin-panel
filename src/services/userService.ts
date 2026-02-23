import type {
  User,
  CreateUserData,
  UserResponse,
  UpdateUserData,
} from "../types/user";
import apiClient from "../api/client";

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const UserService = {
  getAll: (params: GetUsersParams = {}): Promise<UserResponse> => {
    return apiClient.get("users", { params });
  },
  getById: (id: number): Promise<User> => {
    return apiClient.get(`/users/${id}`);
  },
  create: (data: CreateUserData): Promise<User> => {
    return apiClient.post("/users", data);
  },
  put: (id: number, data: UpdateUserData): Promise<User> => {
    return apiClient.put(`/users/${id}`, data);
  },
  delete: (id: number): Promise<{ message: string; deleteId: number }> => {
    return apiClient.delete(`/users/${id}`);
  },
};
