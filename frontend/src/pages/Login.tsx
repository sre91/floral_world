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
    e.preventDefault();
    setLoading(true);

    try {
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
    } finally {
      setLoading(false);
    }
  };

  return (
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

          <button
            type="submit"
            disabled={loading}
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
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
