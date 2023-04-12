import { createSlice } from "@reduxjs/toolkit";
const initialState: Array<any> = [];

export const getCartTotal = (cartItems: Array<any>) => {
  return cartItems?.reduce((amount: any, item: any) => item.price + amount, 0);
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      console.log(action);

      state.push(action.payload);
    },
    removeFromCart(state: any, action: any) {
      return state.filter((item: any) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlicer.actions;
export default cartSlicer.reducer;
