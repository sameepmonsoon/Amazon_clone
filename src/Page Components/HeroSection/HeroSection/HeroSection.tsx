import React, { useEffect, useState, useContext } from "react";
import "../HeroSection/HeroSection.scss";
import Card from "../../../Components/Cards/ProductCard/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { fetchProducts } from "../../../store/productSlice";
import Cookies from "js-cookie";
import { UserOrder } from "../../../Layout/HomeLayout";
import SkeletonLoading from "../../../Components/Skeleton Loading/SkeletonLoading";
import { useLocation } from "react-router-dom";
import { HTTPMethods } from "../../../Utils/HTTPMethods";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state: any) => state.product);
  function addToBasket(value: any) {
    dispatch(addToCart(value));
  }
  const { search } = useContext(UserOrder);
  const [cartItems, setCartItems] = useState<any>(
    JSON.parse(Cookies.get("cartItems") || "[]")
  );
  const location = useLocation().pathname;
  useEffect(() => {
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);
  console.log(products);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());

    // HTTPMethods.post(`/product/add`, products)
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [location]);

  return (
    <UserOrder.Consumer>
      {(value: any) => (
        <div className="hero">
          <div className="hero-image-container">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1633174524778-61a18ee54490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80"
              alt=""
            />
          </div>

          <div className="products-dual">
            {products
              .filter((item: any) =>
                item.category.toLowerCase().startsWith(search)
              )
              .slice(10, 12)
              .map((item: any, index: number) => {
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
            {products
              .filter(
                (item: any) =>
                  item.category.toLowerCase().startsWith(search) ||
                  item.category.toLowerCase().includes(search)
              )
              .map((item: any, index: number) => {
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
      )}
    </UserOrder.Consumer>
  );
};

export default HeroSection;
