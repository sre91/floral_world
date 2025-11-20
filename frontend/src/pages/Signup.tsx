import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";

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
      // Correct API call using axiosInstance
      await api.post("/auth/register", formData);

      alert("Registration successful!");
      navigate("/login");
    } catch (err: unknown) {
      // Full TypeScript-safe error handling
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response
      ) {
        const errorData = (
          err as {
            response?: { data?: { message?: string } };
          }
        ).response;

        alert(errorData?.data?.message || "Registration failed.");
      } else {
        alert("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
            className="w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d] outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d] outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-[#0f1a14] text-[#e6d9b5]
              border border-[#2c3e34] focus:border-[#c3b27d] outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold transition cursor-pointer
              bg-[#1f3a2d] text-[#e6d9b5] border border-[#2b4a38]
              hover:bg-[#2b4a38] hover:border-[#c3b27d]
              disabled:bg-[#3a5a48] disabled:text-[#9aa898] disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-[#c3b893] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c3b27d] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
