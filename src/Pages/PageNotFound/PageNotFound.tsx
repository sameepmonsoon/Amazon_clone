import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout
      children={
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignContent: "center",
            height: "100vh",
            gap: "20px",
          }}>
          <p>Page Not Found</p>
          <p
            onClick={() => navigate("/")}
            style={{
              border: "1px solid gray",
              padding: "10px",
              cursor: "pointer",
              width: "200px",
              alignSelf: "center",
            }}>
            Go back! <BsArrowLeftShort size={35} />
          </p>
        </div>
      }
    />
  );
};

export default PageNotFound;
