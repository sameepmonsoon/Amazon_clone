import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Card from "../Components/Cards/ProductCard/Card";
import "./Checkout.scss";
import SubTotalCard from "../Components/Cards/SubTotalCard/SubTotalCard";
const Checkout = (props: { checkoutAds?: React.ReactNode }) => {
  const { checkoutAds } = props;
  return (
    <HomeLayout
      children={
        <div className="checkout-container">
          <div className="checkout-ads">{checkoutAds}</div>
          <h2 className="checkout-header">Your Shopping cart</h2>
          <div className="checkout-product-container">
            <div className="checkout-product">
              <Card
                anotherSection={true}
                id={121}
                image="../../../public/vite.svg"
                title={"a"}
                rating={<></>}
                button={<button>Add to cart</button>}
                ratings={4}
                price={100}
              />
            </div>
            <div className="checkout-subtotal">
              <SubTotalCard
                totalAmount={500}
                totalItems={5}
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
