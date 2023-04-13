import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const CART_COOKIE = "cartItems";
interface CartState {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const initialState: CartState[] = [];
export const getCartTotal = (cartItems: Array<any>) => {
  return cartItems?.reduce((amount: any, item: any) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal + amount;
  }, 0);
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      const existingItem = state.find(
        (item: any) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity < 10) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        };
        state.push(newItem);
      }
    },
    removeFromCart(state: any, action: any) {
      const updatedState = state.filter(
        (item: any) => item.id !== action.payload
      );
      Cookies.set(CART_COOKIE, JSON.stringify(updatedState));
      return updatedState;
    },
    incrementCartItem(state: any, action: any) {
      const item = state.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
        Cookies.set(CART_COOKIE, JSON.stringify(state));
      }
    },
    decrementCartItem(state: any, action: any) {
      const item = state.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
        if (item.quantity === 0) {
          const index = state.items.findIndex(
            (item: any) => item.id === action.payload
          );
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
        Cookies.set(CART_COOKIE, JSON.stringify(state));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
} = cartSlicer.actions;
export default cartSlicer.reducer;
