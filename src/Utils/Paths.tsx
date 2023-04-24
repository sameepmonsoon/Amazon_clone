import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Home from "../Pages/Home/Home";
import Checkout from "../Pages/Checkout/Checkout";
import LoginSignup from "../Pages/LoginSignup/LoginSignup";
import Profile from "../Pages/Profile/Profile";
import Collection from "../Pages/Collection/Collection";
import Payment from "../Pages/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "../Pages/Orders/Orders";
import SearchPage from "../Pages/Search/SearchPage";
const promise = loadStripe(
  "pk_test_51MxbTVC3OOoE618T2D6VD2A8zXPOSXZxMEeDQnxJ4X3drQoiMrx2cZur9X4dkaYVFxcSGdpLPpO4CMEfEoHetR3w00FSHz2dwp"
);
export const router: any = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  { path: "/login", element: <LoginSignup /> },
  { path: "/signup", element: <LoginSignup /> },
  // { path: "/profile", element: <Profile /> },
  { path: "/collection", element: <Collection /> },
  { path: "/orders", element: <Orders /> },
  { path: "/search/:id", element: <SearchPage /> },

  {
    path: "/payment",
    element: (
      <Elements stripe={promise}>
        <Payment />
      </Elements>
    ),
  },
]);
