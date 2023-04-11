import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Card from "../Components/Cards/Card";

const Checkout = () => {
  return (
    <HomeLayout
      children={
        <>
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
        </>
      }
    />
  );
};

export default Checkout;
