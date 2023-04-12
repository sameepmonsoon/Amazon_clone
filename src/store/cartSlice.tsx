import { createSlice } from "@reduxjs/toolkit";
const initialState: Array<any> = [];
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlicer.actions;
export default cartSlicer.reducer;
