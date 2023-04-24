import { Slide, toast } from "react-toastify";
import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import { AiFillAmazonSquare } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
} from "../../store/userSlice";
const Login = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // yup validation
  const Schema = yup.object().shape({
    email: yup.string().required("Email is required."),
    password: yup
      .string()
      .min(5, "At least 5 characters required")
      .required("Password is required"),
  });
  // formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      //@ts-ignore

      dispatch(login());
      HTTPMethods.post("/auth/signin", values)
        .then((res) => {
          localStorage.setItem("userToken", res.data.token); // save token to local storage
          dispatch(loginSuccess(res.data));
          resetForm();
          const toastId = "alert";
          const existingToast = toast.isActive(toastId);

          if (existingToast) {
            toast.update(toastId, {
              render: "Login Successful.",
              autoClose: 1000,
            });
          } else {
            toast("Login Successful.", {
              toastId: toastId,
              className: "toast-center",
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              closeButton: false,
              transition: Slide,
              icon: false,
              style: {
                backgroundColor: "#E7FFF1;",
                color: "#02844B",
              },
            });
          }
          navigate("/");
        })
        .catch((err) => {
          resetForm();
          dispatch(loginFailure());

          if (err.response) {
            // network error, but response received
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);

            if (existingToast) {
              toast.update(toastId, {
                render: `${
                  err.response.data.message
                    ? err.response.data.message
                    : "Can't login. Please try again later."
                }`,
                autoClose: 1000,
              });
            } else {
              toast.error(
                `${
                  err.response.data.message
                    ? err.response.data.message
                    : "Can't login. Please try again later."
                }`,
                {
                  toastId: toastId,
                  className: "toast-center",
                  position: "bottom-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  closeButton: false,
                  transition: Slide,
                  icon: false,
                  style: {
                    backgroundColor: " #FAE8E9",
                    color: "#E84A4A",
                  },
                }
              );
            }
          } else {
            // network error, no response received
            toast.error("Network error. Please try again later.", {
              className: "toast-center",
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              closeButton: false,
              transition: Slide,
              icon: false,
              style: {
                backgroundColor: " #FAE8E9",
                color: "#E84A4A",
              },
            });
          }
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
        <h2>Sign In</h2>
        <div className="textfields">
          <TextField
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange} //@ts-ignore
            placeholder={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"
            } //@ts-ignore
            className={
              formik.touched.email && formik.errors.email ? "form-error" : ""
            }
          />
          <span className="password">
            <TextField
              {...formik.getFieldProps("password")}
              type="password"
              name="password"
              maxLength={10}
              placeholder={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password"
              }
              //@ts-ignore
              className={
                formik.touched.password && formik.errors.password
                  ? "form-error"
                  : "form-placeholder"
              }
            />
          </span>
        </div>
        <button type="submit">Continue</button>
        <p>
          By signing-in you agree to Amazon's Condition of Use & Sale. Please
          see out Privacy Notice , our Cookies Notice and our interest-Based Ads
          Notice.
        </p>
        <button
          className="new-signup"
          onClick={() => {
            navigate("/signup");
            formik.resetForm();
          }}>
          Create your Amazon Account
        </button>
      </form>
    </div>
  );
};

export default Login;
