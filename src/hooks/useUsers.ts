import { useState, useEffect } from "react";
import { UserService } from "../services/userService";
import type { User } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null); // Hata state'i ekledik

  const fetchUser = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await UserService.getAll({ page, search, limit: 10 });
      setUsers(res.data); // bu array
      setTotalPages(res.totalPages);
    } catch (err) {
      setError("server not work amigo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page, search]);

  const deleteUser = async (id: number) => {
    await UserService.delete(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = (updateUser: User) => {
    setUsers((prev) =>
      prev.map((U) => (U.id === updateUser.id ? updateUser : U)),
    );
  };

  return {
    users,
    loading,
    totalPages,
    page,
    search,
    setPage,
    deleteUser,
    setSearch,
    updateUser,
    error,
    fetchUser,
  };
}
