import React from "react";
import "./Card.scss";
import { HiStar ,HiOutlineStar} from "react-icons/hi2";
const Card = (props: {
  image: string;
  button: React.ReactNode;
  rating: React.ReactNode;
  title: string;
  ratings: number;
  price: number;
}) => {
  const { image, button, rating, title, ratings, price } = props;
  const item: Array<React.ReactNode> = [];
  for (let i: number = 0; i <=ratings; i++) {
    if(i<ratings){
        item.push(<HiStar size={18} key={i}/>);

    }else{
        item.push(<HiOutlineStar size={18} key={i}/>)
    }
  }
  return (
    <div className="card">
      <p className="card-image">
        <img src={image} alt="" />
      </p>
      <div className="card-details">
        <div className="card-title">{title}</div>
        <p>RS.{price}</p>
        <p className="card-ratings">
          <span className="card-ratings-star">{item}</span>
          <span className="card-button">{button}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
