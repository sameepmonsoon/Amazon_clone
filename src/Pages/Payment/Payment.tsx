import React from "react";
import "./Payment.scss";
import HomeLayout from "../../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components/TextField/TextField";
import {
  getCartTotal,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  addToCart,
} from "../../store/cartSlice";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import SubTotalCard from "../../Components/Cards/SubTotalCard/SubTotalCard";
const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart);
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <HomeLayout
      children={
        <div className="payment">
          <div className="payment-address">
            <h3>Delivery Address</h3>
            <form className="address-form">
              <span>
                <MdEmail size={20} />
                <TextField
                  type="email"
                  name="email"
                  value={currentUser.email}
                />
              </span>

              <span>
                <IoLocationOutline size={20} />
                <TextField type="text" name="street" maxLength={20} />
              </span>

              <span>
                <TbMap2 size={20} />
                <TextField type="text" name="city" maxLength={15} />
              </span>
            </form>
          </div>{" "}
          <div className="payment-address">
            <h3>payment method</h3>
            <form className="address-form">
              <span>
                <TextField type="checkbox" name="cash-on-delivery" />
                <TextField type="checkbox" name="stripe" />
              </span>
              <span>
                <SubTotalCard
                  totalAmount={getCartTotal(cartItems)}
                  totalItems={cartItems.length}
                  subtotalCheckoutButton={
                    <button
                      onClick={() => {
                        navigate("/payment");
                      }}>
                      Order
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
