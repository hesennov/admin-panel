import ReusablePagination from "../../components/reusablePagination/ReusablePagination";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import { useOrders } from "../../hooks/useOrders";
import { ordersColumn } from "./ordersColumn";

export default function OrderListPage() {
  const { loading, page, orders, setPage, totalPages,  } =
    useOrders();

  const handleDelete = () => {
    console.log("deleted user");
  };
  const handleEdit = () => {
    console.log("edited user");
  };

  return (
    <div>
      <ReusableTable
        data={orders}
        loading={loading}
        columns={ordersColumn({ onDelete: handleDelete, onEdit: handleEdit })}
      />
      <ReusablePagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
