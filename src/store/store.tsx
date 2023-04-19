import { configureStore } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import recommendReducer from "./recommendProduct";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    recommend: recommendReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
