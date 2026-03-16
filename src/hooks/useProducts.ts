import { useState, useEffect } from "react";
import type { Products,  } from "../types/Products";
import { productService } from "../services/productService";
export function useProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.gettAll({ page, search, limit: 10 });
      setProducts(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError("server not work amigo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const deleteProducts = async (id: number) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (updateProduct: Products) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updateProduct.id ? updateProduct : p)),
    );
  };

  return {
    products,
    page,
    setPage,
    totalPages,
    setTotalPages,
    search,
    loading,
    deleteProducts,
    updateProduct,
    error,
    fetchProducts,
    setSearch,
  };
}
