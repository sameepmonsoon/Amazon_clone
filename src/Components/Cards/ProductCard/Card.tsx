import React from "react";
import "./Card.scss";
import { HiStar, HiOutlineStar } from "react-icons/hi2";
const Card = (props: {
  id: number | string;
  image: string;
  button: React.ReactNode;
  category: string;
  description?: string;
  ratings: number;
  price: number;
  anotherSection?: boolean;
  quantity?: number;
  decrementButton?: React.ReactNode;
  incrementButton?: React.ReactNode;
}) => {
  const {
    image,
    button,
    category,
    description,
    ratings,
    price,
    id,
    incrementButton,
    anotherSection,
    quantity,
    decrementButton,
  } = props;
  const item: Array<React.ReactNode> = [];

  for (let i: number = 0; i <= Math.ceil(ratings); i++) {
    if (i < ratings) {
      item.push(<HiStar size={18} key={i} />);
    } else {
      item.push(<HiOutlineStar size={18} key={i} />);
    }
  }
  return (
    <div className={`${anotherSection ? "horizontal-card " : "card"}`} key={id}>
      <p className="card-image">
        <img src={image} alt="" />
      </p>
      <div className="card-details">
        <div className="card-title">{category}</div>
        <div className="card-description">{description}</div>
        <p>RS.{price}</p>
        <div className="card-ratings">
          <span className="card-ratings-star">
            {ratings}
            {item}
          </span>
          <div className="card-button">
            {button}
            {anotherSection && (
              <div className="quantity-container">
                <span>{decrementButton}</span>
                <span className="quantity">{quantity}</span>
                <span>{incrementButton}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
