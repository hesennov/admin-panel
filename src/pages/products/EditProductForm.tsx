import { useState } from "react";
import type { EditProduct, Products } from "../../types/Products";
interface EditProps {
  product: Products;
  onClose: () => void;
  onSave: (data: EditProps) => void;
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
    // onSave(form);
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="">EDIT PRODUCT-{product.title}</h2>
    </div>
  );
}
