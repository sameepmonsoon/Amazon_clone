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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    await HTTPMethods.post(`/payment/${currentUser._id}/create`, {
      amount: Math.floor(getCartTotal(cartItems)),
      products: cartItems,
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
      });
  };
  const handleChange = (e: any) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <HomeLayout
      children={
        <div className="payment">
          <div className="payment-address">
            <h3>Delivery Address</h3>
            <form className="address-form">
              <span>
                <MdEmail size={20} className="svg" />
                <TextField
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={() => {}}
                />
              </span>

              <span>
                <IoLocationOutline size={20} className="svg" />
                <TextField type="text" name="street" maxLength={20} />
              </span>

              <span>
                <TbMap2 size={20} className="svg" />
                <TextField type="text" name="city" maxLength={15} />
              </span>
            </form>
          </div>{" "}
          <div className="payment-address">
            <h3>payment method</h3>
            <form className="address-form" onSubmit={handleSubmit}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
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
            </form>
          </div>
        </div>
      }
    />
  );
};

export default Payment;
