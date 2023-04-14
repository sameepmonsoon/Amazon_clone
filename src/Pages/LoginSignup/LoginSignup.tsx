import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import "./LoginSignup.scss";
import Form from "../../Page Components/Form/Form";
const LoginSignup = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  if (location.pathname.includes("/signup"))
    return (
      <HomeLayout
        children={
          <div className="signup">
            <Form children={""} type="signup" />
          </div>
        }
      />
    );
  else
    return (
      <HomeLayout
        children={
          <div className="login">
            <Form children={""} type="signin" />
          </div>
        }
      />
    );
};

export default LoginSignup;
