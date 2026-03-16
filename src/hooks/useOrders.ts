import { orderService } from "../services/orderService";
import type {  Orders } from "../types/orders";
import { useState, useEffect } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getall({ page,  limit: 10 });
      setOrders(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(`server not work amigo ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, ]);

  const deleteOrder = async (id: number) => {
    await orderService.delete(id);
    setOrders((order) => order.filter((o) => o.id !== id));
  };

  const updateOrder = (updatedOrder: Orders) => {
    setOrders((prev) =>
      prev.map((p) => (p.id === updatedOrder.id ? updatedOrder : p)),
    );
  };

  return {
    updateOrder,
    deleteOrder,
    fetchOrders,
    orders,
    page,
    setPage,
    loading,
    error,
    totalPages,
    setTotalPages}
  ;
}
