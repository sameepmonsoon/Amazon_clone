import React, { Children } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { AiFillAmazonSquare, BsCart2 } from "react-icons/all";
import { useSelector } from "react-redux";
interface HomeLayoutTypes {
  children: React.ReactNode;
}
const HomeLayout = (props: HomeLayoutTypes) => {
  const { children } = props;
  const cartItems = useSelector((state: any) => state.cart);
  // const cartItemLocal = JSON.parse(localStorage.getItem("cartItems") || "[]");

  return (
    <div>
      <Navbar
        icon={<AiFillAmazonSquare size={45} />}
        cartIcon={<BsCart2 size={25} />}
        cartItems={cartItems.length}
      />
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
