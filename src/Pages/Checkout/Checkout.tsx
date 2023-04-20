import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../Components/Cards/ProductCard/Card";
import "./Checkout.scss";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubTotalCard from "../../Components/Cards/SubTotalCard/SubTotalCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartTotal,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  addToCart,
} from "../../store/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import Cookies from "js-cookie";
import axios from "axios";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { useNavigate } from "react-router-dom";
const Checkout = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const cartItems = useSelector((state: any) => state.cart);
  const localItemsCart = JSON.parse(Cookies.get("cartItems") || "[]");
  const navigate = useNavigate();
  // to get the cookie data and set it
  useEffect(() => {
    if (localItemsCart.length === 0) {
      Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 1 });
    }
  }, [cartItems]);

  function removeItem(item: any) {
    dispatch(removeFromCart(item));
  }
  function incrementCart(item: any) {
    dispatch(incrementCartItem(item));
  }
  function decrementCart(item: any) {
    dispatch(decrementCartItem(item));
  }
  const customStyle = {
    top: "50%",
  };
  const handleCart = () => {
    if (currentUser.length !== 0)
      HTTPMethods.post(`/cart/${currentUser._id}/addCart`, cartItems)
        .then((res) => {
          console.log(res);
          toast.success("Items Added into collection.", {
            className: "toast-center",
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false,
            transition: Slide,
            icon: false,
          });
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Items Added into collection.", {
            className: "toast-center",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false,
            transition: Slide,
            icon: false,
          });
        });
    else {
      const toastId = "alert";
      if (!toast.isActive(toastId)) {
        toast.error("Please login to continue.", {
          toastId: toastId,
          className: "toast-center",
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          closeButton: false,
          transition: Slide,
          icon: false,
          style: { color: "white" },
        });
      } else {
        toast.update(toastId, {
          render: <div>Please login to continue.</div>,

          autoClose: 1000,
        });
      }
    }
  };

  const handlePayment = () => {
    if (currentUser.length !== 0) {
      navigate("/payment");
    } else {
      const toastId = "login-toast";
      if (!toast.isActive(toastId)) {
        toast.error("Please login to continue.", {
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
          style: { color: "white" },
        });
      } else {
        toast.update(toastId, {
          render: <div>Please login to continue.</div>,
          autoClose: 1000,
        });
      }
    }
  };
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
                      id={item?.id}
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
                subtotalButton={
                  <button
                    onClick={() => {
                      handleCart();
                    }}>
                    Add to Collection
                  </button>
                }
                subtotalCheckoutButton={
                  <button
                    onClick={() => {
                      handlePayment();
                    }}>
                    Proceed To pyament
                  </button>
                }
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Checkout;
