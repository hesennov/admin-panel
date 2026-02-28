import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import { userColumns } from "./usersColumns";
import ReusablePagination from "../../components/reusablePagination/ReusablePagination";
import ReusableModal from "../../components/reusableModal/ReusableModal";
import EditUserForm from "./EditUserForm";
import type { UpdateUserData, User } from "../../types/user";
import { UserService } from "../../services/userService";
import StatusView from "../../components/common/StatusView";
export default function UserListPage() {
  const {
    users,
    loading,
    page,
    totalPages,
    search,
    error,
    setPage,
    setSearch,
    deleteUser,
    updateUser,
    fetchUser,
  } = useUsers();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;
    await deleteUser(selectedId);
    setSelectedId(null);
  };

  const handleOpenEditModal = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) setEditingUser(user);
  };
  const handleCloseEditModal = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = async (data: UpdateUserData) => {
    if (!editingUser) return;

    const updated = await UserService.put(editingUser.id, data);
    console.log("UPDATED RESPONSE:", updated);
    updateUser(updated);
    setEditingUser(null);
    console.log("EDIT DATA:", data);
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
        onRetry={fetchUser}
      />
    );
  }
  if (users.length === 0) {
    return (
      <StatusView
        type="empty"
        message="It looks a bit quiet here...... No products have been added yet."
      />
    );
  }

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
          onEdit: handleOpenEditModal,
        })}
      />
      <ReusablePagination
        setPage={setPage}
        page={page}
        totalPages={totalPages}
      />

      <ReusableModal isOpen={selectedId !== null} onClose={handleCloseModal}>
        <h2 className="font-bold text-lg mb-2 "> DELETED USER</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="gap-4 flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 rounded text-white"
            onClick={handleCloseModal}
          >
            cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={handleConfirmDelete}
          >
            delete
          </button>
        </div>
      </ReusableModal>
      <ReusableModal isOpen={!!editingUser} onClose={handleCloseEditModal}>
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onClose={handleCloseEditModal}
            onSave={handleSaveEdit}
          />
        )}
      </ReusableModal>
    </>
  );
}
