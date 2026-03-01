import { useState } from "react";
import type { EditProduct, Products } from "../../types/Products";
interface EditProps {
  product: Products;
  onClose: () => void;
  onSave: (data: EditProduct) => void;
}

export default function EditProductForm({
  product,
  onClose,
  onSave,
}: EditProps) {
  const [form, setForm] = useState<EditProduct>({
    title: product.title,
    price: product.price,
    stock: product.stock,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="">EDIT PRODUCT-{product.title}</h2>
      <input
        type="text"
        className=" border p-2"
        name="title"
        onChange={handleChange}
        value={form.title}
      />
      <input
        type="number"
        value={form.price}
        name="price"
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="number"
        value={form.stock}
        name="stock"
        onChange={handleChange}
        className="border p-2"
      />

      <div className="flex justify-end gap-1">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:opacity-50 active:opacity-100"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-yellow-500  text-white rounded hover:opacity-50 active:opacity-100 "
          onClick={() => onSubmit()}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
