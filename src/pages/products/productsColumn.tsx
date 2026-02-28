import type { Column } from "../../types/user";
import type { Products } from "../../types/Products";

export const productsColumn = (): Column<Products>[] => [
  { label: "Title", key: "title" },
  { label: "Price", key: "price" },
  {
    label: "Stock",
    key: "stock",
    render: (value) => {
      const stockValue = Number(value);
      return (
        <div
          className={`px-2 py-1 rounded text-center font-medium ${
            stockValue <= 5
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {value} {stockValue <= 5 ? "⚠️ Low Stock" : "In Stock"}
        </div>
      );
    },
  },
];
