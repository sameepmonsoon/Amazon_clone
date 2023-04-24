import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Slide, toast } from "react-toastify";

const CART_COOKIE = "cartItems";
interface CartState {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const initialState: CartState[] = JSON.parse(Cookies.get("cartItems") || "[]");
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
        // if (existingItem.quantity < 10) {
        //   existingItem.quantity++;
        //   existingItem.totalPrice = existingItem.price * existingItem.quantity;

        const toastId = "alert";
        const existingToast = toast.isActive(toastId);

        if (existingToast) {
          toast.update(toastId, {
            render: "Item is already in the cart.",
            autoClose: 1000,
          });
        } else {
          toast.error("Item is already in the cart.", {
            toastId: toastId,
            className: "toast-center",
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false,
            transition: Slide,
            icon: false,
            style: {
              backgroundColor: " #FAE8E9",
              color: "#E84A4A",
            },
          });
        }

        // }
      } else {
        if (state.length < 10) {
          const newItem = {
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          };
          state.push(newItem);
        } else {
          const toastId = "alert";
          const existingToast = toast.isActive(toastId);

          if (existingToast) {
            toast.update(toastId, {
              render: "Your cart is full. Cannot add more item.",
              autoClose: 1000,
            });
          } else {
            toast.error("Your cart is full. Cannot add more item.", {
              toastId: toastId,
              className: "toast-center",
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              closeButton: false,
              transition: Slide,
              icon: false,
              style: {
                backgroundColor: " #FAE8E9",
                color: "#E84A4A",
              },
            });
          }
        }
      }
      Cookies.set("cartItems", JSON.stringify(state), { expires: 1 });
    },
    removeFromCart(state: any, action: any) {
      const updatedState = state.filter(
        (item: any) => item.id !== action.payload
      );
      Cookies.set("cartItems", JSON.stringify(updatedState), { expires: 1 });

      const toastId = "alert";
      const existingToast = toast.isActive(toastId);

      if (existingToast) {
        toast.update(toastId, {
          render: "Item Removed Successfully.",
          autoClose: 1000,
        });
      } else {
        toast.error("Item Removed Successfully.", {
          toastId: toastId,
          className: "toast-center",
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          closeButton: false,
          transition: Slide,
          icon: false,
          style: {
            backgroundColor: " #FAE8E9",
            color: "#E84A4A",
          },
        });
      }
      // Cooki es.set(CART_COOKIE, JSON.stringify(updatedState));
      return updatedState;
    },
    incrementCartItem(state: any, action: any) {
      const item = state.find((item: any) => item.id === action.payload);
      if (item) {
        if (item.quantity >= 10) {
          item.quantity = 10;
          item.totalPrice = item.price * item.quantity;
          Cookies.set("cartItems", JSON.stringify(state), { expires: 1 });
          const toastId = "alert";
          const existingToast = toast.isActive(toastId);

          if (existingToast) {
            toast.update(toastId, {
              render: "Your shopping cart is full. Only 10 items can be added.",
              autoClose: 1000,
            });
          } else {
            toast.error(
              "Your shopping cart is full. Only 10 pieces per item can be added.",
              {
                toastId: toastId,
                className: "toast-center",
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false,
                transition: Slide,
                icon: false,
                style: {
                  backgroundColor: " #FAE8E9",
                  color: "#E84A4A",
                },
              }
            );
          }
        } else {
          item.quantity++;
          item.totalPrice = item.price * item.quantity;
          Cookies.set("cartItems", JSON.stringify(state), { expires: 1 });
        }
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
        Cookies.set("cartItems", JSON.stringify(state), { expires: 1 });
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
