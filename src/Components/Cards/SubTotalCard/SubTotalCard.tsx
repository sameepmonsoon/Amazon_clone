import React from "react";
import "./SubTotalCard.scss";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
const SubTotalCard = (props: {
  totalItems?: number;
  totalAmount?: number | any;
  subtotalButton?: React.ReactNode;
  subtotalCheckoutButton?: React.ReactNode;
  giftCard?: boolean;
}) => {
  const {
    totalItems,
    totalAmount,
    giftCard,
    subtotalButton,
    subtotalCheckoutButton,
  } = props;

  return (
    <div className="subtotal-card">
      {totalAmount && (
        <p>
          <b>
            Subtotal ({totalItems} items) :<TbCurrencyRupeeNepalese size={18} />
            {totalAmount?.toFixed(2)}
          </b>
        </p>
      )}
      {giftCard && (
        <p
          style={{
            display: "flex",
            justifyContent: "start",
            alignContent: "center",
            gap: "5px",
          }}>
          <input type="checkbox" name="" id="" />
          This card contains gift.
        </p>
      )}
      <span className="subtotal-button">
        <> {subtotalButton}</> <>{subtotalCheckoutButton}</>
      </span>
    </div>
  );
};

export default SubTotalCard;
