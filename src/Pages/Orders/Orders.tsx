import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../Components/Cards/ProductCard/Card";
import "../Checkout/Checkout.scss";
import SubTotalCard from "../../Components/Cards/SubTotalCard/SubTotalCard";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders, getOrder } from "../../store/orderSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import Cookies from "js-cookie";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { UserOrder } from "../../Layout/HomeLayout";
import { useContext } from "react";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
const Orders = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  const { userOrder } = useContext(UserOrder);
  const [collection, setCollection] = useState<any>([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const { product } = useSelector((state: any) => state.order);
  const cartItems = useSelector((state: any) => state.cart);
  JSON.parse(localStorage.getItem("currentUser") || "[]") || null;
  useEffect(() => {
    if (currentUser.length !== 0)
      HTTPMethods.get(`/payment/${currentUser._id}/get`)
        .then((res) => {
          setCollection(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [cartItems, location]);
  return (
    <HomeLayout
      children={
        <UserOrder.Consumer>
          {(value) => (
            <div className="checkout-container">
              <div className="checkout-ads">{checkoutAds}</div>
              <h2 className="checkout-header">Your Order History</h2>
              <div className="checkout-product-container">
                <div className="checkout-product">
                  {collection.products !== undefined &&
                    collection.products.map((item: any, index: number) => {
                      return (
                        <div key={index}>
                          <Card
                            anotherSection={true}
                            id={item?.id}
                            image={item.image}
                            category={item.category}
                            description={item.description}
                            button={<>Quantity</>}
                            ratings={item.rating?.rate}
                            quantity={item.quantity}
                            price={item.price}
                            incrementButton={<></>}
                            decrementButton={<></>}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="checkout-subtotal">
                  <SubTotalCard
                    subtotalButton={
                      <>
                        <p>
                          <b>Total :</b>
                          <b>
                            <TbCurrencyRupeeNepalese size={18} />
                            {collection.amount}
                          </b>
                        </p>
                        <p>
                          <b>Ordered Items :</b>
                          <b>{collection?.products?.length} Items</b>
                        </p>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </UserOrder.Consumer>
      }
    />
  );
};

export default Orders;
