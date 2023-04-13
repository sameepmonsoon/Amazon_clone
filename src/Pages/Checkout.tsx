import React, { useEffect } from "react";
import HomeLayout from "../Layout/HomeLayout";
import Card from "../Components/Cards/ProductCard/Card";
import "./Checkout.scss";
import SubTotalCard from "../Components/Cards/SubTotalCard/SubTotalCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartTotal,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  addToCart,
} from "../store/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import Cookies from "js-cookie";
const Checkout = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  const cartItems = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    // Retrieve the cart items from localStorage and dispatch the setCart action to update the cart state
    const cartItems = JSON.parse(Cookies.get("cartItems") || "[]");
    dispatch(addToCart(cartItems));
  }, []);
  function removeItem(item: any) {
    dispatch(removeFromCart(item));
  }
  function incrementCart(item: any) {
    dispatch(incrementCartItem(item));
  }
  function decrementCart(item: any) {
    dispatch(decrementCartItem(item));
  }
  return (
    <HomeLayout
      children={
        <div className="checkout-container">
          <div className="checkout-ads">{checkoutAds}</div>
          <h2 className="checkout-header">Your Shopping cart</h2>
          <div className="checkout-product-container">
            <div className="checkout-product">
              {cartItems.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <Card
                      anotherSection={true}
                      id={item.id}
                      image={item.image}
                      category={item.category}
                      description={item.description}
                      button={
                        <button
                          onClick={() => {
                            removeItem(item.id);
                          }}>
                          <AiOutlineDelete size={25} />
                        </button>
                      }
                      ratings={item.rating?.rate}
                      quantity={item.quantity}
                      price={item.price}
                      incrementButton={
                        <MdAdd
                          size={25}
                          onClick={() => {
                            incrementCart(item.id);
                          }}
                        />
                      }
                      decrementButton={
                        <HiMinusSm
                          size={25}
                          onClick={() => {
                            decrementCart(item.id);
                          }}
                        />
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="checkout-subtotal">
              <SubTotalCard
                totalAmount={getCartTotal(cartItems)}
                totalItems={cartItems.length}
                subtotalButton={<></>}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Checkout;
