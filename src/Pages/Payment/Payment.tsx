import "./Payment.scss";
import { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import { getCartTotal } from "../../store/cartSlice";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import SubTotalCard from "../../Components/Cards/SubTotalCard/SubTotalCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ImSpinner3 } from "react-icons/im";
import { useEffect } from "react";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import * as yup from "yup";
import { useFormik } from "formik";
import { Slide, toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart);
  const { currentUser } = useSelector((state: any) => state.user);
  const [disabled, setDisabled] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const getClient = async () => {
      const response = await HTTPMethods.post(`/payment/create`, {
        amount: Math.floor(getCartTotal(cartItems)),
        products: cartItems,
      }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    };
    getClient();
  }, []);

  // on submit
  const handleChange = (e: any) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  // schema
  let Schema = yup.object().shape({
    email: yup.string().required("Please, enter your email."),
    street: yup.string().required("Please, enter your street name."),
    city: yup.string().required("Please, enter your city"),
  });

  const formik = useFormik({
    initialValues: {
      email: currentUser?.email || "",
      street: "",
      city: "",
    },
    onSubmit: async (value: any, action: any) => {
      setProcessing(true);
      await HTTPMethods.post(`/payment/${currentUser._id}/create`, {
        amount: Math.floor(getCartTotal(cartItems)),
        products: cartItems,
        address: value,
      }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
      const payload = await stripe
        ?.confirmCardPayment(clientSecret, {
          // @ts-ignore
          payment_method: { card: elements?.getElement(CardElement) },
        })
        .then((res) => {
          setSucceeded(true);
          // @ts-ignore
          setError(null);
          setProcessing(false);
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          const toastId = "alert";
          const existingToast = toast.isActive(toastId);

          if (existingToast) {
            toast.update(toastId, {
              render: `${err.response.data.message}`,
              autoClose: 1000,
            });
          } else {
            toast.error(`${err.response.data.message}`, {
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
            });
          }
        });
    },
    validationSchema: Schema,
  });
  return (
    <HomeLayout
      children={
        <form className="payment" onSubmit={formik.handleSubmit}>
          <div className="payment-address">
            <h3>Delivery Address</h3>
            <div className="address-form">
              <span>
                <MdEmail size={18} className="svg" />
                <TextField
                  {...formik.getFieldProps("email")}
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={formik.handleChange}
                />
              </span>

              <span>
                <IoLocationOutline size={18} className="svg" />
                <TextField
                  {...formik.getFieldProps("street")}
                  type="text"
                  name="street"
                  maxLength={20}
                  placeholder={
                    formik.touched.city && formik.errors.street
                      ? formik.errors.street
                      : "Street"
                  }
                  //@ts-ignore
                  className={
                    formik.touched.city && formik.errors.street
                      ? "form-error"
                      : ""
                  }
                />
              </span>

              <span>
                <TbMap2 size={18} className="svg" />
                <TextField
                  {...formik.getFieldProps("city")}
                  type="text"
                  name="city"
                  maxLength={15}
                  placeholder={
                    formik.touched.city && formik.errors.city
                      ? formik.errors.city
                      : "City"
                  } //@ts-ignore
                  className={
                    formik.touched.city && formik.errors.city
                      ? "form-error"
                      : ""
                  }
                />
              </span>
            </div>
          </div>
          <div className="payment-address">
            <h3>payment method</h3>
            <div className="address-form">
              <div className="payment-card">
                card details <br />
                <CardElement onChange={handleChange} />
              </div>
              <span>
                <SubTotalCard
                  totalAmount={getCartTotal(cartItems)}
                  totalItems={cartItems.length}
                  subtotalCheckoutButton={
                    <button
                      type="submit"
                      onClick={(e: any) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                      }}
                      disabled={processing || disabled || succeeded}>
                      {processing ? (
                        <ImSpinner3
                          size={20}
                          style={{
                            position: "relative",
                            top: "2px",
                            left: "0",
                          }}
                        />
                      ) : (
                        "Order"
                      )}
                    </button>
                  }
                />
              </span>
            </div>
          </div>
        </form>
      }
    />
  );
};

export default Payment;
