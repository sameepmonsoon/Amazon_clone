import { configureStore } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
export const store = configureStore({
  reducer: { cart: cartReducer, product: productReducer },
});
export type RootState = ReturnType<typeof store.getState>;
