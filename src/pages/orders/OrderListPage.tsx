import StatusView from "../../components/common/StatusView";
import ReusablePagination from "../../components/reusablePagination/ReusablePagination";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import { useOrders } from "../../hooks/useOrders";
import { ordersColumn } from "./ordersColumn";

export default function OrderListPage() {
  const { loading, page, orders, setPage, totalPages,error,fetchOrders  } =
    useOrders();

  const handleDelete = () => {
    console.log("deleted user");
  };
  const handleEdit = () => {
    console.log("edited user");
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
          onRetry={fetchOrders}
        />
      );
    }
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
