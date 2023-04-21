import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Slide, toast } from "react-toastify";

import { BsCaretUpFill, TbSearch } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { HTTPMethods } from "../../Utils/HTTPMethods";
const Navbar = (props: {
  icon: React.ReactNode;
  cartIcon: React.ReactNode;
  cartItems: number;
  currentUserName: string;
  searchFilter: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { icon, cartIcon, cartItems, currentUserName, searchFilter } = props;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dropdown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const handleLogin = () => {
    if (currentUser.length !== 0) {
      navigate("/orders");
    } else navigate("/login");
  };
  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
    const toastId = "alert";
    const existingToast = toast.isActive(toastId);

    if (existingToast) {
      toast.update(toastId, {
        render: "You are now logged out. See you soon!",
        autoClose: 1000,
      });
    } else {
      toast("You are now logged out. See you soon!", {
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
  };
  const { id } = useParams();
  const getPayment = async () => {
    const response = await HTTPMethods.get(
      `/payment/${currentUser._id}/get`
    ).then((res) => {
      navigate("/orders");
    });
  };

  const handleSubmit = (value: any) => {
    searchFilter(value);
    if (!value.trim()) {
      if (id) {
        navigate(`/search/${id}`);
      } else {
        navigate("/");
      }
    } else if (value.toLowerCase() === "all") {
      navigate("/");
    } else navigate(`/search/${value}`);
  };
  return (
    <div className="navbar">
      <span
        className="navbar-icon"
        onClick={() => {
          navigate("/");
        }}>
        {icon}
      </span>
      <form className="navbar-search" onSubmit={handleSubmit}>
        <div className="navbar-search-filter">
          <select
            id="select"
            value={category}
            onClick={() => {
              setDropDown(!dropdown);
            }}
            onChange={(e: any) => {
              setCategory(e.target.value);
              handleSubmit(e.target.value);
            }}>
            <option value="all">All</option>
            <option value="men">Men's</option>
            <option value="women">Women's</option>
            <option value="electronics">Electronics</option>{" "}
            <option value="jewelery">Jewelery</option>
          </select>
          <span id="custom-arrow" className={dropdown ? "rotate-up" : ""}>
            <BsCaretUpFill size={18} />
          </span>
        </div>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search Amazon"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            if (!e.target.value.trim()) searchFilter("");
          }}
          value={search !== undefined && search !== null ? search : id}
          maxLength={15}
        />
        <button
          className="search-icon"
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            handleSubmit(search);
          }}>
          <TbSearch size={25} />
        </button>
      </form>
      <div className="navbar-options">
        <span
          className="navbar-option-one"
          onMouseOver={() => {
            setIsOpen(true);
          }}
          onClick={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 400);
          }}>
          Hello {currentUserName ? `${currentUserName}` : "Guest"}
          {isOpen && (
            <div
              className="navbar-user-menu-container"
              onMouseOver={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 400);
              }}>
              <p
                className="navbar-user-menu-link"
                onClick={() => {
                  handleLogin();
                }}>
                <button>Sign in</button>
                <span>
                  New customer? <a href="/signup">&nbsp;Start here</a>
                </span>
              </p>
              <div className="navbar-user-menu-div">
                <div className="navbar-user-details">
                  <ul>
                    <li
                      className="navbar-user-menu-item"
                      onClick={() => navigate("/collection")}>
                      Collection
                    </li>

                    <li
                      className="navbar-user-menu-item"
                      onClick={() => {
                        setTimeout(() => {
                          handleLogout();
                        }, 2000);
                      }}>
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </span>
        <span
          className="navbar-option-two"
          onClick={() => {
            getPayment();
            navigate("/orders");
          }}>
          Return &nbsp;
          <br />
          <b> & Orders</b>
        </span>
        <span
          className="navbar-option-three"
          onClick={() => navigate("/checkout")}>
          {cartIcon} {cartItems}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
