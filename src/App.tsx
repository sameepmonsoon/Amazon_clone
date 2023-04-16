import { useState } from "react";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Pages/Checkout/Checkout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AiFillAmazonSquare } from "react-icons/all";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import LoginSignup from "./Pages/LoginSignup/LoginSignup";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Profile from "./Pages/Profile/Profile";
import Collection from "./Pages/Collection/Collection";
function App() {
  const [count, setCount] = useState(0);
  const StyledCartIcon = () => (
    <AiFillAmazonSquare size={35} style={{ color: "white" }} />
  );

  // Convert the styled icon to a base64 string
  const cartIconString = renderToString(<StyledCartIcon />);
  const cartIconBase64 = btoa(cartIconString);

  const router: any = createBrowserRouter([
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
  ]);
  return (
    <>
      <Helmet>
        <title>Amazon</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml;base64,${cartIconBase64}`}
        />
        <meta name="description" content="This is a description" />
      </Helmet>
      <Provider store={store}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

export default App;
