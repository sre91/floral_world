import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface AdminProductState {
  products: Product[];
  loading: boolean;
}

const initialState: AdminProductState = { products: [], loading: false };

// fetch products
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || "Failed to fetch products";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Product
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (product: Omit<Product, "_id">, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/admin/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Add failed"
      );
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (product: Product, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/admin/products/${product._id}`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
