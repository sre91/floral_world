import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyOrders from "./pages/MyOrders";
import Success from "./pages/success";
import Cancel from "./pages/Cancel";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageProducts from "./admin/pages/ManageProducts";
import ManageUsers from "./admin/pages/ManageUsers";
import ChatBot from "./pages/ChatBot";
import ProductDetails from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Navbar + Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<MyOrders />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatBot />
          </ProtectedRoute>
        }
      />

      {/* not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
