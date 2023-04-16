import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../Components/Cards/ProductCard/Card";
import "../Checkout/Checkout.scss";
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
const Collection = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  const [collection, setCollection] = useState<any>([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const cartItems = useSelector((state: any) => state.cart);
  const localItemsCart = JSON.parse(Cookies.get("cartItems") || "[]");
  console.log(collection);
  const currentUserLocal =
    JSON.parse(localStorage.getItem("currentUser") || "[]") || null;
  useEffect(() => {
    if (localItemsCart.length === 0) {
      Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 1 });
    }

    if (currentUser.length !== 0)
      HTTPMethods.get(`/cart/${currentUserLocal._id}/getCart`)
        .then((res) => {
          setCollection(res.data[0]);
        })
        .catch((err) => console.log("Message:", err.message));
    else {
      alert("please login to continue");
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

  const handleCart = () => {
    if (currentUser)
      HTTPMethods.post(`/cart/${currentUser._id}/cart`, cartItems)
        .then((res) => {
          console.log(res);
          setCollection(res.data.cart?.cartItems[0]);
        })
        .catch((err) => console.log(err.message));
    else {
      alert("please login to continue");
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
                subtotalButton={
                  <button
                    onClick={() => {
                      dispatch(addToCart(collection));
                    }}>
                    Continue
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
