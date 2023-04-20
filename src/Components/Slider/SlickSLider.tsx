import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import "./SimpleSlider.scss";

export const SimpleSlider = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const prevSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? data.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === data.length - 1 ? 0 : currentSlide + 1
    );
  };

  console.log("data:", data);
  console.log("currentSlide:", currentSlide);

  return (
    <div className="slider">
      <div className="slider-content">
        {data.map((item, index) => (
          <div
            key={index}
            className={index === currentSlide ? "slide_xx`ZZactive" : "slide"}>
            <span>{item.title}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
      <MdOutlineArrowBackIosNew
        size={25}
        className="pre-button"
        onClick={prevSlide}
      />
      <MdOutlineArrowForwardIos
        size={25}
        className="next-button"
        onClick={nextSlide}
      />
    </div>
  );
};
