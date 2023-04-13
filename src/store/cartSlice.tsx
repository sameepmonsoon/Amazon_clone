import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

const CART_COOKIE= "cartItems"
const initialState: Array<any> = [];

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
        // If the item already exists in the cart, update its quantity and total price
        if (existingItem.quantity < 10) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      } else {
        // If the item is not already in the cart, add it with quantity 1
        const newItem = {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        };
        state.push(newItem);
      }
    },
    removeFromCart(state: any, action: any) {
      return state.filter((item: any) => item.id !== action.payload);
    },
    incrementCartItem(state: any, action: any) {
      const item = state.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementCartItem: (state: any, action: any) => {
      const item = state.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          const index = state.items.findIndex(
            (item: any) => item.id === action.payload
          );
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
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
