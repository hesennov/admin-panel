import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import ReusableTable from "../../components/reusableTable/ReusableTable";
import { userColumns } from "./usersColumns";
import ReusablePagination from "../../components/reusablePagination/ReusablePagination";
import ReusableModal from "../../components/reusableModal/ReusableModal";
import EditUserForm from "./EditUserForm";
import type { UpdateUserData, User } from "../../types/user";
import apiClient from "../../api/client";
import { UserService } from "../../services/userService";
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
    updateUser,
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
