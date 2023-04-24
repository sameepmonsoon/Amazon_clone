import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../Components/Cards/ProductCard/Card";
import "../Checkout/Checkout.scss";
import SubTotalCard from "../../Components/Cards/SubTotalCard/SubTotalCard";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";
import {
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  addToCart,
} from "../../store/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import Cookies from "js-cookie";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { useNavigate } from "react-router-dom";
const Collection = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;

  const navigate = useNavigate();
  const [collection, setCollection] = useState<any>([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const cartItems = useSelector((state: any) => state.cart);
  const localItemsCart = JSON.parse(Cookies.get("cartItems") || "[]");
  const currentUserLocal =
    JSON.parse(localStorage.getItem("currentUser") || "[]") || null;
  useEffect(() => {
    if (localItemsCart.length === 0) {
      Cookies.set("cartItems", JSON.stringify(collection), { expires: 1 });
    }

    if (currentUser.length !== 0)
      HTTPMethods.get(`/cart/${currentUserLocal._id}/getCart`)
        .then((res) => {
          setCollection(res.data[0]);
        })
        .catch((err) => console.log("Message:", err.message));
    else {
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);

      if (existingToast) {
        toast.update(toastId, {
          render: "Please login to continue.",
          autoClose: 1000,
        });
      } else {
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
          style: {
            backgroundColor: " #FAE8E9",
            color: "#E84A4A",
          },
        });
      }
    }
  }, [cartItems, location]);

  function removeItem(item: any) {
    dispatch(removeFromCart(item));
  }
  function incrementCart(item: any) {
    dispatch(incrementCartItem(item));
  }
  function decrementCart(item: any) {
    dispatch(decrementCartItem(item));
  }

  const handleCookie = () => {
    collection.forEach((item: any) => {
      dispatch(addToCart(item));
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);

      if (existingToast) {
        toast.update(toastId, {
          render: "Item added into the cart.",
          autoClose: 1000,
        });
      } else {
        toast("Item added into the cart.", {
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
            backgroundColor: "#E7FFF1;",
            color: "#02844B",
          },
        });
      }
    }); // update the cart with new collection items
    Cookies.set("cartItems", JSON.stringify(collection), {
      expires: 1,
    });
  };

  const handlePayment = () => {
    if (currentUser.length !== 0) {
      navigate("/payment");
    } else {
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);

      if (existingToast) {
        toast.update(toastId, {
          render: "Please login to continue.",
          autoClose: 1000,
        });
      } else {
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
          style: {
            backgroundColor: " #FAE8E9",
            color: "#E84A4A",
          },
        });
      }
    }
  };
  return (
    <HomeLayout
      children={
        <div className="checkout-container">
          <div className="checkout-ads">{checkoutAds}</div>
          <h2 className="checkout-header">Your Collection</h2>
          <div className="checkout-product-container">
            <div className="checkout-product">
              {collection.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <Card
                      anotherSection={true}
                      id={item?.id}
                      image={item.image}
                      category={item.category}
                      description={item.description}
                      ratings={item.rating?.rate}
                      quantity={item.quantity}
                      price={item.price}
                      button={<b>Quantity :</b>}
                    />
                  </div>
                );
              })}
            </div>
            <div className="checkout-subtotal">
              <SubTotalCard
                subtotalCheckoutButton={
                  <button
                    onClick={() => {
                      handlePayment();
                    }}>
                    Proceed To pyament
                  </button>
                }
                subtotalButton={
                  <button
                    onClick={() => {
                      handleCookie();
                    }}>
                    Add to cart
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

export default Collection;
