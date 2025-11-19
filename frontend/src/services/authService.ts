import axios, { AxiosError } from "axios";

// Backend URL (Render deployed backend)
const API_URL = "https://floral-world.onrender.com/api";

// Function to register a new user
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    alert(err.response?.data?.message || "Registration failed");
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Unexpected error" };
  }
};
