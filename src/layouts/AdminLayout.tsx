import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800  text-white p-4">
        <h2 className="text-xl font-bold ">Admin Panel</h2>
        <nav className="flex flex-col  gap-2">
          <NavLink to={"/users"} className="hover:underline">
            Users
          </NavLink>
          <NavLink to={"/Products"} className="hover:underline">
            Products
          </NavLink>
          <NavLink to={"/Orders"} className="hover:underline">
            Orders
          </NavLink>
          <NavLink to={"/users"} className="hover:underline">
            Users
          </NavLink>
          <NavLink to={"/Products"} className="hover:underline">
            Products
          </NavLink>
          <NavLink to={"/Orders"} className="hover:underline">
            Orders
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 bg-gray-200 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
