import React from "react";
import "./Navbar.scss";
import { TbSearch } from "react-icons/all";
import { useNavigate } from "react-router-dom";
const Navbar = (props: {
  icon: React.ReactNode;
  cartIcon: React.ReactNode;
}) => {
  const { icon, cartIcon } = props;
  const navigate = useNavigate();
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
        <span className="navbar-option-one">Hello Guest,Sign In</span>
        <span className="navbar-option-two">Return Orders</span>
        <span className="navbar-option-three">
          {cartIcon} {0}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
