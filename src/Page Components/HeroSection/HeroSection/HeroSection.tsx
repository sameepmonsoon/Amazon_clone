import React, { useEffect, useState, useContext } from "react";
import "../HeroSection/HeroSection.scss";
import Card from "../../../Components/Cards/ProductCard/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { fetchRecommendedProduct } from "../../../store/recommendProduct";
import { fetchProducts } from "../../../store/productSlice";
import Cookies from "js-cookie";
import { UserOrder } from "../../../Layout/HomeLayout";
import { useLocation } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import "react-awesome-slider/dist/styles.css";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state: any) => state.product);
  const { data: recommend } = useSelector((state: any) => state.recommend);
  console.log("inside the reducer", recommend.recommendedProducts);

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
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
    // @ts-ignore
    dispatch(fetchRecommendedProduct());
  }, [location]);

  return (
    <UserOrder.Consumer>
      {(value: any) => (
        <div className="hero">
          <div className="hero-image-container">
            {recommend?.recommendedProducts && (
              <div className="products-recommend">
                <h3>Top selling Products</h3>{" "}
                <div className="products">
                  {recommend?.recommendedProducts
                    ? [...recommend.recommendedProducts]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 4)
                        .map((item: any, index: number) => {
                          return item.map((item: any, index: number) => {
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
                                        if (cartItems.length <= 9) {
                                          addToBasket({ ...item, quantity: 1 });

                                          const toastId = "alert";
                                          const existingToast =
                                            toast.isActive(toastId);

                                          if (existingToast) {
                                            toast.update(toastId, {
                                              render:
                                                "Item added into the cart.",
                                              autoClose: 1000,
                                            });
                                          } else {
                                            toast("Item added into the cart.", {
                                              toastId: toastId,
                                              className: "toast-center",
                                              position: "bottom-center",
                                              autoClose: 1000,
                                              hideProgressBar: true,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "colored",
                                              closeButton: false,
                                              transition: Slide,
                                              icon: false,
                                              style: {
                                                backgroundColor: "#E7FFF1;",
                                                color: "#02844B",
                                              },
                                            });
                                          }
                                        } else {
                                          const toastId = "alert";
                                          const existingToast =
                                            toast.isActive(toastId);

                                          if (existingToast) {
                                            toast.update(toastId, {
                                              render:
                                                "Item Removed Successfully.",
                                              autoClose: 1000,
                                            });
                                          } else {
                                            toast.error(
                                              "Your cart is full .Cannot add more item.",
                                              {
                                                toastId: toastId,
                                                className: "toast-center",
                                                position: "bottom-center",
                                                autoClose: 1000,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                                closeButton: false,
                                                transition: Slide,
                                                icon: false,
                                                style: {
                                                  backgroundColor: " #FAE8E9",
                                                  color: "#E84A4A",
                                                },
                                              }
                                            );
                                          }
                                        }
                                      }}>
                                      Add to cart
                                    </button>
                                  }
                                  ratings={item?.rating.rate}
                                  price={item.price}
                                />
                              </div>
                            );
                          });
                        })
                    : null}
                </div>
              </div>
            )}
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
                          const toastId = "alert";
                          const existingToast = toast.isActive(toastId);

                          if (existingToast) {
                            toast.update(toastId, {
                              render: "Item added into the cart.",
                              autoClose: 1000,
                            });
                          } else {
                            toast("Item added into the cart.", {
                              toastId: toastId,
                              className: "toast-center",
                              position: "bottom-center",
                              autoClose: 1000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                              closeButton: false,
                              transition: Slide,
                              icon: false,
                              style: {
                                backgroundColor: "#E7FFF1;",
                                color: "#02844B",
                              },
                            });
                          }
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
                            if (cartItems.length <= 9) {
                              addToBasket({ ...item, quantity: 1 });

                              const toastId = "alert";
                              const existingToast = toast.isActive(toastId);

                              if (existingToast) {
                                toast.update(toastId, {
                                  render: "Item added into the cart.",
                                  autoClose: 1000,
                                });
                              } else {
                                toast("Item added into the cart.", {
                                  toastId: toastId,
                                  className: "toast-center",
                                  position: "bottom-center",
                                  autoClose: 1000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                  closeButton: false,
                                  transition: Slide,
                                  icon: false,
                                  style: {
                                    backgroundColor: "#E7FFF1;",
                                    color: "#02844B",
                                  },
                                });
                              }
                            } else {
                              const toastId = "alert";
                              const existingToast = toast.isActive(toastId);

                              if (existingToast) {
                                toast.update(toastId, {
                                  render: "Item Removed Successfully.",
                                  autoClose: 1000,
                                });
                              } else {
                                toast.error(
                                  "Your cart is full .Cannot add more item.",
                                  {
                                    toastId: toastId,
                                    className: "toast-center",
                                    position: "bottom-center",
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    closeButton: false,
                                    transition: Slide,
                                    icon: false,
                                    style: {
                                      backgroundColor: " #FAE8E9",
                                      color: "#E84A4A",
                                    },
                                  }
                                );
                              }
                            }
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
