import React from "react";
import "./Card.scss";
import { HiStar } from "react-icons/hi2";
const Card = (props: {
  image: string;
  button: React.ReactNode;
  rating: React.ReactNode;
  title: string;
  ratings: number;
}) => {
  const { image, button, rating, title, ratings } = props;
  return (
    <div className="card">
      <p className="card-image">
        <img src={image} alt="" />
      </p>
      <div className="card-details">
        <div className="card-title">{title}</div>
        <p>price</p>
        <p className="card-ratings">
          <span className="card-ratings-star">
            <HiStar size={25} />
          </span>
          <span className="card-button">{button}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
