import React from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout";
import { logout } from "../../store/userSlice";
import { AiFillAmazonSquare } from "react-icons/ai";
const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const cartItems = useSelector((state: any) => state.cart);
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
            <button onClick={() => handleLogout()}>Logout:</button>
          </div>
        </div>
      }
    />
  );
};

export default Profile;
