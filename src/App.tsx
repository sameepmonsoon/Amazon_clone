import { useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GrAmazon } from "react-icons/all";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
function App() {
  const [count, setCount] = useState(0);
  const StyledCartIcon = () => (
    <GrAmazon size={35} style={{ color: "#ff9900" }} />
  );

  // Convert the styled icon to a base64 string
  const cartIconString = renderToString(<StyledCartIcon />);
  const cartIconBase64 = btoa(cartIconString);

  const router: any = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]);
  return (
    <>
      {" "}
      <Helmet>
        <title>Shopping Cart</title>
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
