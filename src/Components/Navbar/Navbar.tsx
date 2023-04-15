import React from "react";
import "./Navbar.scss";
import { TbSearch } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sider from "../Sider/Sider";
import { ImAmazon, BsCart2 } from "react-icons/all";
import { logout } from "../../store/userSlice";
const Navbar = (props: {
  icon: React.ReactNode;
  cartIcon: React.ReactNode;
  cartItems: number;
  currentUserName: string;
}) => {
  const { icon, cartIcon, cartItems, currentUserName } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const handleLogin = () => {
    if (currentUser) {
      // dispatch(logout());
      navigate("/profile");
    } else navigate("/login");
  };
  return (
    <div className="navbar">
      <span
        className="navbar-icon"
        onClick={() => {
          navigate("/");
        }}>
        {icon}
      </span>
      <span className="navbar-search">
        <span className="navbar-search-filter">All</span>
        <input type="text" placeholder="Search Amazon" />
        <span className="search-icon">
          <TbSearch size={25} />
        </span>
      </span>
      <div className="navbar-options">
        <span
          className="navbar-option-one"
          onClick={() => {
            handleLogin();
          }}>
          Hello ,{currentUserName ? `${currentUserName}` : "Guest ,Sign In"}
        </span>
        <span className="navbar-option-two">Return Orders</span>
        <span
          className="navbar-option-three"
          onClick={() => navigate("/checkout")}>
          {cartIcon} {cartItems}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
