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
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClient = async () => {
      const response = await HTTPMethods.post(
        `/payment/create`,
        getCartTotal(cartItems)
      );
    };
    getClient();
  }, []);
  const handleSubmit = async (e: any) => {
    e.prevenDefault();
    setProcessing(true);
    const payload = await stripe
      ?.confirmCardPayment(getCartTotal(cartItems), {
        payment_method: {
          // @ts-ignore
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        // @ts-ignore
        setError(null);
        setProcessing(false);
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
              <span>
                <CardElement onChange={handleChange} />
              </span>
              <span>
                <SubTotalCard
                  totalAmount={getCartTotal(cartItems)}
                  totalItems={cartItems.length}
                  subtotalCheckoutButton={
                    <button
                      onClick={() => {}}
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
