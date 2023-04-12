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
  },
});

export const { addToCart } = cartSlicer.actions;
export default cartSlicer.reducer;
