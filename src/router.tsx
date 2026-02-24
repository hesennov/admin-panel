import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserListPage from "./pages/users/UserListPage";
import UserCreatePage from "./pages/users/UserCreatePage";
// import EditUserForm from "./pages/users/EditUserForm";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          {/* <Route path="/users/:id/edit" element={<EditUserForm />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
