import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Import all your slices
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import adminProductsReducer from "../features/adminProductSlice"; // ✅ for Admin Dashboard

// Load persisted cart from localStorage
function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem("cartState");
    if (data === null) return undefined;
    return { cart: JSON.parse(data) }; // ✅ Load only cart slice
  } catch (error) {
    console.error("Could not load cart from localStorage:", error);
    return undefined;
  }
}

// Save cart to localStorage whenever store changes
function saveToLocalStorage(state: RootState) {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem("cartState", serialized);
  } catch (error) {
    console.error("Could not save cart to localStorage:", error);
  }
}

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    adminProducts: adminProductsReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
