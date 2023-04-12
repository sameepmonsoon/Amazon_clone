import { configureStore } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { cart: cartReducer },
});
