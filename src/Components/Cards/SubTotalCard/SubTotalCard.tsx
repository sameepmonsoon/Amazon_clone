import React from "react";

const SubTotalCard = (props: {
  totalItems: number;
  totalAmount: number;
  subtotalButton: React.ReactNode;
  giftCard?: boolean;
}) => {
  const { totalItems, totalAmount, giftCard, subtotalButton } = props;
  return (
    <div className="subtotal-card">
      <p>
        Subtotal ({totalItems} items) : Rs <span>{totalAmount}</span>
      </p>
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
      <span className="subtotal-button"><button>a</button></span>
    </div>
  );
};

export default SubTotalCard;
