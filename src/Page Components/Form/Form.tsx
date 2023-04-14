import React from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import { AiFillAmazonSquare } from "react-icons/ai";
const Form = (props: { children: React.ReactNode; type: string }) => {
  const { children, type } = props;
  const navigate = useNavigate();
  if (type.toLowerCase() === "signup")
    return (
      <div className="form-main-div">
        <span className="form-amazon-icon">
          <AiFillAmazonSquare size={50} />
        </span>
        <div className="form-container">
          <h2>{type}</h2>
          <div className="textfields">
            <TextField type="email" name="email" placeholder="Email" />
            <TextField type="password" name="password" maxLength={10} />
            <TextField type="password" name="confirm password" maxLength={10} />
          </div>
          <button>sign up</button>
          <p>
            By signing-up you agree to Amazon's Condition of Use & Sale. Please
            see out Privacy Notice , our Cookies Notice and our interest-Based
            Ads Notice.
          </p>
        </div>
      </div>
    );
  else
    return (
      <div className="form-main-div">
        <span className="form-amazon-icon">
          <AiFillAmazonSquare size={50} />
        </span>
        <div className="form-container">
          <h2>{type}</h2>
          <div className="textfields">
            <TextField type="email" name="email" placeholder="Email" />
            <span className="password">
              <TextField type="password" name="password" maxLength={10} />
            </span>
          </div>
          <button>sign In</button>
          <p>
            By signing-in you agree to Amazon's Condition of Use & Sale. Please
            see out Privacy Notice , our Cookies Notice and our interest-Based
            Ads Notice.
          </p>
          <button className="new-signup" onClick={() => navigate("/signup")}>
            Create your Amazon Account
          </button>
        </div>
      </div>
    );
};

export default Form;
