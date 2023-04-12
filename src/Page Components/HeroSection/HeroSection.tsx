import React from "react";
import "./HeroSection.scss";
import Card from "../../Components/Cards/ProductCard/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
const HeroSection = () => {
  const dispatch = useDispatch();
  const addToBasket = (value: any) => {
    dispatch(addToCart(value));
  };
  return (
    <div className="hero">
      <div className="hero-image-container">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1633174524778-61a18ee54490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80"
          alt=""
        />
      </div>
      <div className="products-dual">
        <Card
          id={121}
          image="../../../public/vite.svg"
          title={"a"}
          rating={<></>}
          button={
            <button
              onClick={() => {
                addToCart;
                console.log("added");
              }}>
              Add to cart
            </button>
          }
          ratings={4}
          price={100}
        />
        <Card
          id={1323213}
          image="../../../public/vite.svg"
          title={"a"}
          rating={<></>}
          button={<button>Add to cart</button>}
          ratings={4}
          price={100}
        />
      </div>
      <div className="products">
        <Card
          id={1323213}
          image="../../../public/vite.svg"
          title={"a"}
          rating={<></>}
          button={<button>Add to cart</button>}
          ratings={4}
          price={100}
        />
        <Card
          id={1323213}
          image="../../../public/vite.svg"
          title={"a"}
          rating={<></>}
          button={<button>Add to cart</button>}
          ratings={4}
          price={100}
        />
        <Card
          id={1323213}
          image="../../../public/vite.svg"
          title={"a"}
          rating={<></>}
          button={<button>Add to cart</button>}
          ratings={4}
          price={100}
        />
      </div>
    </div>
  );
};

export default HeroSection;
