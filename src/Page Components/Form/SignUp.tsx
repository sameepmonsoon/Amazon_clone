//@ts-nocheck

import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import { AiFillAmazonSquare } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import Cookies from "js-cookie";

const Form = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  // yup validation
  let Schema = yup.object().shape({
    username:
      isSignIn === false
        ? yup.string().required("username is required.")
        : null,
    email: yup.string().required("Email is required."),
    password: yup
      .string()
      .min(5, "At least 5 characters required")
      .required("Password is required"),
    confirmPassword:
      isSignIn === false
        ? yup.string().oneOf([yup.ref("password")], "Passwords must match")
        : null,
  });
  // formik form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, action) => {
      console.log(values);
      isSignIn === false
        ? HTTPMethods.post("/auth/signup", values)
            .then((res: any) => {
              Cookies.set("token", res.data.token);
              console.log(res);
              action.resetForm();
            })
            .catch((err) => {
              console.log(err.message);
              action.resetForm();
            })
        : HTTPMethods.post("/auth/signin", values)
            .then((res) => {
              console.log(res);
              action.resetForm();
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
              action.resetForm();
            });
    },
    validationSchema: Schema,
  });

  return (
    <div className="form-main-div">
      <span className="form-amazon-icon">
        <AiFillAmazonSquare size={50} />
      </span>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h2>Sign Up</h2>
        <div className="textfields">
          <TextField
            {...formik.getFieldProps("username")}
            type="text"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onChange={formik.handleChange}
            placeholder={
              formik.touched && formik.errors.username
                ? formik.errors.username
                : "Username"
            }
            className={formik.errors.username ? "form-error" : ""}
          />

          <TextField
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            placeholder={
              formik.touched && formik.errors.email
                ? formik.errors.email
                : "Email"
            }
            className={
              formik.touched && formik.errors.email ? "form-error" : ""
            }
          />
          <TextField
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            maxLength={10}
            onChange={formik.handleChange}
            placeholder={
              formik.touched && formik.errors.password
                ? formik.errors.password
                : "password"
            }
            className={
              formik.touched && formik.errors.password ? "form-error" : ""
            }
          />
          <TextField
            {...formik.getFieldProps("password")}
            type="password"
            name="confirmPassword"
            maxLength={10}
            onChange={formik.handleChange}
            placeholder={
              formik.touched && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : "Confirm Password"
            }
            className={
              formik.touched && formik.errors.confirmPassword
                ? "form-error"
                : ""
            }
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            setIsSignIn(false);
          }}>
          sign up
        </button>
        <p>
          By signing-up you agree to Amazon's Condition of Use & Sale. Please
          see out Privacy Notice , our Cookies Notice and our interest-Based Ads
          Notice.
        </p>{" "}
        <button
          className="new-signup"
          onClick={() => {
            navigate("/login");
            formik.resetForm();
          }}>
          Already have an Amazon Account ?
        </button>
      </form>
    </div>
  );
};

export default Form;
