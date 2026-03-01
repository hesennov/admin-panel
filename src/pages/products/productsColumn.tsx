import type { Column } from "../../types/user";
import type { Products } from "../../types/Products";

export const productsColumn = (actions: {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}): Column<Products>[] => [
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
  {
    label: "Actions",
    key: "id",
    render: (_, row) => {
      return (
        <div className="flex gap-3">
          {actions.onDelete && (
            <span
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => actions.onDelete(row.id)}
            >
              Delete
            </span>
          )}
          {actions.onEdit && (
            <span
              className="bg-yellow-500 px-2 py-1 text-white rounded"
              onClick={() => actions.onEdit(row.id)}
            >
              EDIT
            </span>
          )}
        </div>
      );
    },
  },
];
