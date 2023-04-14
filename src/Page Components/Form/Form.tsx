import React from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import { AiFillAmazonSquare } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { HTTPMethods } from "../../Utils/HTTPMethods";

const Form = (props: { children: React.ReactNode; type: string }) => {
  const { children, type } = props;
  const navigate = useNavigate();
  // yup validation
  let Schema = yup.object().shape({
    username: yup.string().required("username is required."),
    email: yup.string().required("Email is required."),
    password: yup
      .string()
      .min(5, "At least 5 characters required")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  // formik form handling
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, action) => {
      HTTPMethods.post("/auth/signup", values)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    validationSchema: Schema,
  });

  if (type.toLowerCase() === "signup")
    return (
      <div className="form-main-div">
        <span className="form-amazon-icon">
          <AiFillAmazonSquare size={50} />
        </span>
        <form className="form-container" onSubmit={formik.handleSubmit}>
          <h2>{type}</h2>
          <div className="textfields">
            <TextField
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
            />

            <TextField
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
            />
            <TextField
              type="password"
              name="password"
              maxLength={10}
              onChange={formik.handleChange}
            />
            <TextField
              type="password"
              name="confirmPassword"
              maxLength={10}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit">sign up</button>
          <p>
            By signing-up you agree to Amazon's Condition of Use & Sale. Please
            see out Privacy Notice , our Cookies Notice and our interest-Based
            Ads Notice.
          </p>
        </form>
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
