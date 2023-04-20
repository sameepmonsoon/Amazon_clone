import React from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { logout } from "../../store/userSlice";
import { AiFillAmazonSquare } from "react-icons/ai";
const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  const cartItems = useSelector((state: any) => state.cart);
  if (currentUser.length !== 0) {
    return (
      <HomeLayout
        children={
          <div className="profile">
            <div className="profile-card">
              <span className="profile-amazon-icon">
                <AiFillAmazonSquare size={50} />
              </span>
              <label htmlFor="usrname">username: {currentUser?.username}</label>
              <span>Orders : 0</span>
              <span>Total cart Items : {cartItems.length}</span>
              <button
                onClick={() => {
                  setTimeout(() => {
                    handleLogout();
                  }, 2000);
                }}>
                Logout
              </button>
            </div>
            <div style={{ backgroundColor: "red" }}></div>
          </div>
        }
      />
    );
  } else return <>{navigate("/")}</>;
};

export default Profile;
