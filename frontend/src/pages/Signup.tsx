<<<<<<< HEAD
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      alert(error.response?.data?.message || "Registration failed.");
=======
// src/pages/Signup.tsx
import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { AxiosError } from "axios";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload
    setLoading(true);

    try {
      const result = await registerUser(name, email, password);

      alert(result.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "Registration failed");
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center px-6">
      <div className="bg-[#132219] border border-[#2a3c32] shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-[#e6d9b5] mb-6">
          🌸 Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d]
              outline-none transition
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
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
          🌿 Create Your Floral World Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-[#c3b893] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c3b27d] hover:underline">
            Login
          </Link>
=======
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </a>
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
        </p>
      </div>
    </div>
  );
};

export default Signup;
