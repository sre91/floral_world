import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productTypes";

// State shape
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial values
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async action to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://floral-world.onrender.com/api/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data; // returns array of products
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to fetch products"
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
