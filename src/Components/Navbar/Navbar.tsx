import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const handleLogin = () => {
    console.log("object");
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
          onMouseOver={() => {
            setIsOpen(true);
          }}
          onClick={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 400);
          }}>
          Hello {currentUserName ? `${currentUserName}` : "Guest ,Sign In"}
          {isOpen && (
            <div
              className="navbar-user-menu-container"
              onMouseOver={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 400);
              }}>
              <p
                className="navbar-user-menu-link"
                onClick={() => {
                  handleLogin();
                }}>
                <button>Sign in</button>
                <span>
                  New customer? <a href="/signup">Start here</a>
                </span>
              </p>
              <div className="navbar-user-menu-div">
                <div className="navbar-user-details">
                  <ul>
                    <li
                      className="navbar-user-menu-item"
                      onClick={() => navigate("/collection")}>
                      Collection
                    </li>
                    <li className="navbar-user-menu-item">Orders</li>
                    <li className="navbar-user-menu-item">Account</li>
                  </ul>
                </div>
                <div className="navbar-user-menu">
                  <h3>Your Acccount</h3>
                  <ul>
                    <li className="navbar-user-menu-item">Orders</li>
                    <li
                      className="navbar-user-menu-item"
                      onClick={() => {
                        handleLogin();
                      }}>
                      Account
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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
