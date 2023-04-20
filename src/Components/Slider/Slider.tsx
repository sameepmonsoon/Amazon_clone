import React, { useState } from "react";
import "./slider.scss";
import { VscCircleFilled, MdOutlineDoubleArrow } from "react-icons/all";
import Card from "../Cards/ProductCard/Card";
interface recommendedProductsTypes {
  recommendedProducts: any;
}
const Slider = (props: { recommended: Array<recommendedProductsTypes> }) => {
  const { recommended } = props;
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(recommended.length - 1);
    }
  };

  const nextSlide = () => {
    if (slideIndex !== recommended.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  };

  console.log("recommended slider", recommended.recommendedProducts);

  return (
    <div className="slider">
      {recommended?.recommendedProducts?.map((item: any, index: number) => {
        return item.map((product: any, index: number) => {
          return (
            <div className="slider-content" key={index}>
              <Card
                id={11}
                image={item.image}
                category={"nepal"}
                description={item.description}
                button={<></>}
                ratings={item.rating}
                price={item.price}
                key={index}
              />
            </div>
          );
        });
      })}
    </div>
  );
};

export default Slider;
