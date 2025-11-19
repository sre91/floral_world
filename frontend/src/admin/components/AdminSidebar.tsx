import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-green-800 text-white p-5 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-6">🌸 Floral Admin</h2>
      <Link
        to="/admin/dashboard"
        className="hover:bg-green-700 px-3 py-2 rounded-lg transition"
      >
        Dashboard
      </Link>
      <Link
        to="/admin/products"
        className="hover:bg-green-700 px-3 py-2 rounded-lg transition"
      >
        Manage Products
      </Link>
      {/* <Link
        to="/admin/users"
        className="hover:bg-green-700 px-3 py-2 rounded-lg transition"
      >
        Manage Users
      </Link> */}
      <Link
        to="/home"
        className="hover:bg-green-700 px-3 py-2 rounded-lg transition mt-auto"
      >
        Back to Shop
      </Link>
    </div>
  );
};

export default AdminSidebar;
