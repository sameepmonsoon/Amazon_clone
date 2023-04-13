import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Card from "../Components/Cards/ProductCard/Card";
import "./Checkout.scss";
import SubTotalCard from "../Components/Cards/SubTotalCard/SubTotalCard";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeFromCart } from "../store/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
const Checkout = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  const cartItems = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state: any) => state.product);
  function removeItem(item: any) {
    dispatch(removeFromCart(item));
  }
  return (
    <HomeLayout
      children={
        <div className="checkout-container">
          <div className="checkout-ads">{checkoutAds}</div>
          <h2 className="checkout-header">Your Shopping cart</h2>
          <div className="checkout-product-container">
            <div className="checkout-product">
              {products.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <Card
                      anotherSection={true}
                      id={item.id}
                      image={item.image}
                      title={item.category}
                      button={
                        <button
                          onClick={() => {
                            removeItem(item.id);
                          }}>
                          <AiOutlineDelete size={25} />
                        </button>
                      }
                      ratings={item.rating.rate}
                      quantity={1}
                        price={item.price}
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
