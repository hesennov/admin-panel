import { useState, useEffect } from "react";
import type { Products, ProductResponse, EditProduct } from "../types/Products";
import { productService } from "../services/productService";
export function useProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.gettAll({ page, search, limit: 10 });
        setProducts(res.data);
        setTotalPages(res.totalPage);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, search]);

  const deleteProducts = async (id: number) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = async (updateProduct: Products) => {
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
  };
}
