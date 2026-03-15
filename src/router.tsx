import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserListPage from "./pages/users/UserListPage";
import UserCreatePage from "./pages/users/UserCreatePage";
import ProductListPage from "./pages/products/ProductListPage";
import OrderListPage from "./pages/orders/OrderListPage";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
