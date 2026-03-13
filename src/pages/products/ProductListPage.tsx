import { useProducts } from "../../hooks/useProducts";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import ReusablePagination from "../../components/reusablePagination/ReusablePagination";
import ReusableModal from "../../components/reusableModal/ReusableModal";
import type { EditProduct, Products } from "../../types/Products";
import EditProductForm from "./EditProductForm";
import StatusView from "../../components/common/StatusView";
import { productsColumn } from "./productsColumn";
import { useState } from "react";
import { productService } from "../../services/productService";

const ProductListPage = () => {
  const {
    products,
    deleteProducts,
    updateProduct,
    loading,
    page,
    search,
    setSearch,
    setPage,
    setTotalPages,
    totalPages,
    fetchProducts,
    error,
  } = useProducts();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedEditProduct, setSelectedEditProduct] =
    useState<Products | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSubmitSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setSelectedEditProduct(null);
  };

  const handleDeleteOpenModal = (id: number) => {
    setSelectedId(id);
    console.log(id);
  };

  const handleSubmitDeleteProduct = async () => {
    if (selectedId === null) return;
    await deleteProducts(Number(selectedId));
    setSelectedId(null);
  };

  const handleEditOpenModal = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) setSelectedEditProduct(product);

    console.log(id);
  };

  const handleSubmitEditsave = async (data: EditProduct) => {
    if (!selectedEditProduct) return;
    const updated = await productService.put(selectedEditProduct.id, data);
    updateProduct(updated);
    setSelectedEditProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <StatusView
        type="error"
        message="Could not connect to the server.Please make sure the API is running, amigo!!"
        onRetry={fetchProducts}
      />
    );
  }
  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={handleSearchChange}
        className="w-62 p-2 border mb-4"
        placeholder="search..."
      />
      <button onClick={() => handleSubmitSearch()}>search</button>

      <ReusableTable
        columns={productsColumn({
          onDelete: handleDeleteOpenModal,
          onEdit: handleEditOpenModal,
        })}
        data={products}
        loading={loading}
      />
      <ReusablePagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <ReusableModal isOpen={selectedId !== null} onClose={handleCloseModal}>
        <h1 className="font-bold text-lg text-center mb-2">DELETED USER</h1>
        <h2 className="lowercase font-semibold ">
          ARE YOU SURE YOU WANT DELETE THIS USER?
        </h2>
        <div className="flex gap-2 justify-end mt-5">
          <button className="px-4 py-2 rounded bg-gray-500 text-white hover:opacity-50 active:opacity-100">
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:opacity-50  active:opacity-100"
            onClick={() => handleSubmitDeleteProduct()}
          >
            Delete
          </button>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={selectedEditProduct !== null}
        onClose={handleCloseModal}
      >
        {" "}
        hi
        {selectedEditProduct && (
          <EditProductForm
            product={selectedEditProduct}
            onSave={handleSubmitEditsave}
            onClose={handleCloseModal}
          />
        )}
      </ReusableModal>
    </div>
  );
};

export default ProductListPage;
