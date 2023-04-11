import React, { Children } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { ImAmazon, BsCart2 } from "react-icons/all";

interface HomeLayoutTypes {
  children: React.ReactNode;
}
const HomeLayout = (props: HomeLayoutTypes) => {
  const { children } = props;
  return (
    <div>
      <Navbar icon={<ImAmazon size={45} />} cartIcon={<BsCart2 size={25} />} />
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
