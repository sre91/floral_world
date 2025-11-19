<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
=======
import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
    e.preventDefault();
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      setTimeout(() => {
        if (user?.isAdmin) navigate("/admin/dashboard");
        else navigate("/home");
      }, 800);
    } catch {
      toast.error("Login failed. Please try again.");
=======
      const result = await loginUser(email, password);

      // ✅ save JWT token in localStorage
      localStorage.setItem("token", result.token);

      alert(result.message); // “Login successful”

      // ✅ redirect user to /home (protected page)
      navigate("/home");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        alert((error as { message: string }).message);
      } else {
        alert("Login failed");
      }
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center px-6">
      <div className="bg-[#132219] border border-[#2a3c32] shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-[#e6d9b5] mb-3">
          Floral World 🌿
        </h1>

        <p className="text-center text-[#c3b893] mb-8 text-lg">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d]
              outline-none transition
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d]
              outline-none transition
            "
          />
=======
    <div className="min-h-screen flex justify-center items-center bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🌿 Welcome Back to Floral World
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96

          <button
            type="submit"
            disabled={loading}
<<<<<<< HEAD
            className="
              w-full py-3 rounded-xl font-semibold transition cursor-pointer 
              bg-[#1f3a2d] text-[#e6d9b5] border border-[#2b4a38]
              hover:bg-[#2b4a38] hover:border-[#c3b27d]
              disabled:bg-[#3a5a48] disabled:text-[#9aa898] disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-[#c3b893] mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#c3b27d] hover:underline">
            Sign up
=======
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign Up
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
