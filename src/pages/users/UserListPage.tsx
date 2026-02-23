import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import { userColumns } from "./usersColumns";

export default function UserListPage() {
  const {
    users,
    loading,
    page,
    totalPages,
    search,
    setPage,
    setSearch,
    deleteUser,
  } = useUsers();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const handleEditConsole = () => {
    console.log("asdasd");
  };
  return (
    //search
    <>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className="w-62 p-2 border mb-4"
        placeholder="search..."
      />
      <ReusableTable
        data={users}
        loading={loading}
        columns={userColumns({
          onDelete: handleOpenDeleteModal,
          onEdit: handleEditConsole,
        })}
      />
    </>
  );
}
