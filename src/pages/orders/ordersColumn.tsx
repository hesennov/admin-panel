import type { Column } from "../../types/user";
import type { Orders } from "../../types/orders";

export const ordersColumn = (actions: {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}): Column<Orders>[] => [
  { label: "User Id", key: "userId" },
  { label: "Product Id", key: "productId" },
  { label: "Quantity", key: "quantity" },
  { label: "Total Price", key: "totalPrice" },
  { label: "Status", key: "status" },
  {
    label: "Created Date",
    key: "createdAt",
    render: (value) => {
      const date = new Date(value);
      return date.toLocaleDateString();
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
              onClick={() => actions.onDelete(row.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </span>
          )}
          {actions.onEdit && (
            <span
              onClick={() => {
                actions.onEdit(row.id);
              }}
              className="px-2 py-1 bg-yellow-500 rounded "
            >
              Edit
            </span>
          )}
        </div>
      );
    },
  },
];
