import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { HTTPMethods } from "../Utils/HTTPMethods";

const userOrderSlice = createSlice({
  name: "order",
  initialState: {
    currentUser:
      JSON.parse(localStorage.getItem("currentUser") || "[]") || null,
    product: [],
    emptyCart: false,
  },
  reducers: {
    getOrder: (state, action) => {
      state.emptyCart = false;
      state.product = action.payload;
    },
  },
});

export const { getOrder } = userOrderSlice.actions;
export default userOrderSlice.reducer;
export function fetchOrders() {
  return async function fetchProductThunk(dispatch: any) {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser") || "[]") || null;
    const productData = await HTTPMethods.get(`/payment/${currentUser._id}/get`)
      .then((res) => {
        const productsWithQuantity = res.data;
        dispatch(getOrder(productsWithQuantity));
      })
      .catch((err) => {
        console.log("ERROR");
      });
  };
}
