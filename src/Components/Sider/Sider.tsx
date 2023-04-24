import React from "react";
import "./sider.scss";
import { TbSearch } from "react-icons/all";
import { useNavigate } from "react-router-dom";
const Sider = (props: {
  icon: React.ReactNode;
  cartIcon: React.ReactNode;
  cartItems: number;
}) => {
  const { icon, cartIcon, cartItems } = props;
  const navigate = useNavigate();

  return (
    <div className="sider">
      <span
        className="navbar-icon"
        onClick={() => {
          navigate("/");
        }}>
        {icon}
      </span>
      <div className="navbar-options">
        <span
          className="navbar-option-one"
          onClick={() => {
            navigate("/login");
          }}>
          Hello Guest,Sign In
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

export default Sider;
