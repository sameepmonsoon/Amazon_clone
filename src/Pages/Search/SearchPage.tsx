import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../Components/Cards/ProductCard/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { fetchProducts } from "../../store/productSlice";
import Cookies from "js-cookie";
import "./Search.scss";
const SearchPage = () => {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector((state: any) => state.product);
  const { id } = useParams();
  const [cartItems, setCartItems] = useState<any>(
    JSON.parse(Cookies.get("cartItems") || "[]")
  );

  useEffect(() => {
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, []);
  function addToBasket(value: any) {
    dispatch(addToCart(value));
  }
  return (
    <HomeLayout
      children={
        <div className="search-page">
          {products
            .filter(
              (item: any) => item.category.toLowerCase().startsWith(id)
              // || item.category.toLowerCase().includes(id)
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
      }
    />
  );
};

export default SearchPage;
