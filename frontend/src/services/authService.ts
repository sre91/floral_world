import axios, { AxiosError } from "axios";

<<<<<<< HEAD
// Backend URL
const API_URL = "http://localhost:5000/api";

// Function to register a new user
=======
// 🌸 Backend URL
const API_URL = "http://localhost:5000/api";

// 🌿 Function to register a new user
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    // Send data to backend route /api/register
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });

<<<<<<< HEAD
    // Return backends reply
=======
    // Return backend's reply (like { message: "User registered successfully" })
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    alert(err.response?.data?.message || "Registration failed");
  }
};

<<<<<<< HEAD
// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
=======
// 🌿 Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // contains { message, token }
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Unexpected error" };
  }
};
