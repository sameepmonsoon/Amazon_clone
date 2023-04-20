import React, { Children, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { AiFillAmazonSquare, BsCart2 } from "react-icons/all";
import { useSelector } from "react-redux";
import Footer from "../Page Components/Footer/Footer";
import { createContext } from "react";

export const UserOrder = createContext<any>("default");
interface HomeLayoutTypes {
  children: React.ReactNode;
}
const HomeLayout = (props: HomeLayoutTypes) => {
  const { children } = props;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state: any) => state.cart);
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <>
      <Navbar
        icon={<AiFillAmazonSquare size={45} />}
        cartIcon={<BsCart2 size={25} />}
        cartItems={cartItems.length}
        currentUserName={currentUser?.username}
        searchFilter={setSearch}
      />
      <UserOrder.Provider value={{ search }}>{children}</UserOrder.Provider>
      <Footer />
    </>
  );
};

export default HomeLayout;
