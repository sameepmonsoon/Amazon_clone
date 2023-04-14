import React, { useEffect, useState } from "react";
import "./HeroSection.scss";
import Card from "../../../Components/Cards/ProductCard/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { fetchProducts } from "../../../store/productSlice";
import Cookies from "js-cookie";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state: any) => state.product);
  console.log("cart items", products);
  function addToBasket(value: any) {
    dispatch(addToCart(value));
    console.log("added value", value);
  }

  const [cartItems, setCartItems] = useState<any>(
    JSON.parse(localStorage.getItem("cartItems") || "")
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, []);
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
        {products.slice(10, 12).map((item: any, index: number) => {
          return (
            <Card
              id={item.id}
              image={item.image}
              category={item.category}
              description={item.description}
              button={
                <button
                  onClick={() => {
                    addToBasket({ ...item, quantity: 1 });
                  }}>
                  Add to cart
                </button>
              }
              ratings={item.rating.rate}
              price={item.price}
              key={index}
            />
          );
        })}
      </div>
      <div className="products">
        {products.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Card
                id={item.id}
                image={item.image}
                category={item.category}
                description={item.description}
                button={
                  <button
                    onClick={() => {
                      addToBasket({ ...item, quantity: 1 });
                    }}>
                    Add to cart
                  </button>
                }
                ratings={item.rating.rate}
                price={item.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
