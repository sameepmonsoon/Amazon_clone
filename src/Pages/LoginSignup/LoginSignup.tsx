import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import "./LoginSignup.scss";
import Form from "../../Page Components/Form/SignUp";
import Login from "../../Page Components/Form/Login";
import SignUp from "../../Page Components/Form/SignUp";
const LoginSignup = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  if (location.pathname.includes("/signup"))
    return (
      <HomeLayout
        children={
          <div className="signup">
            <SignUp children={""} />
          </div>
        }
      />
    );
  else
    return (
      <HomeLayout
        children={
          <div className="login">
            <Login children={""} />
          </div>
        }
      />
    );
};

export default LoginSignup;
