import React, { useState } from "react";
import "./Card.scss";
import { HiStar, HiOutlineStar } from "react-icons/hi2";
import { CiShoppingTag } from "react-icons/ci";
import { TfiTag } from "react-icons/tfi";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import SkeletonLoading from "../../Skeleton Loading/SkeletonLoading";
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

  for (let i: number = 0; i < 5; i++) {
    if (i <= ratings) {
      item.push(<HiStar size={18} key={i} />);
    } else {
      item.push(<HiOutlineStar size={18} key={i} />);
    }
  }
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 800);
  if (loading) {
    return <SkeletonLoading anotherSection={anotherSection} />;
  } else
    return (
      <div
        className={`${anotherSection ? "horizontal-card " : "card"}`}
        key={id}>
        <p className="card-image">
          <img src={image} alt="" />
        </p>
        <div className="card-details">
          <div className="card-title">
            <TfiTag size={22} />
            {category}
          </div>
          <div className="card-description">{description}</div>
          <p>
            <TbCurrencyRupeeNepalese size={18} />
            {/* might throw error --toFixed() error prone */}
            {price.toFixed(2)}
          </p>
          <div className="card-ratings">
            <span className="card-ratings-star">
              {Math.ceil(ratings)}
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
