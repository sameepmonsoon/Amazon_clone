import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Home from "../Pages/Home/Home";
import Checkout from "../Pages/Checkout/Checkout";
import LoginSignup from "../Pages/LoginSignup/LoginSignup";
import Profile from "../Pages/Profile/Profile";
import Collection from "../Pages/Collection/Collection";
import Payment from "../Pages/Payment/Payment";
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
  { path: "/profile", element: <Profile /> },
  { path: "/collection", element: <Collection /> },
  { path: "/payment", element: <Payment /> },
]);
