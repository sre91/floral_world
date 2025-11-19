import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });

      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i._id !== action.payload);

      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
