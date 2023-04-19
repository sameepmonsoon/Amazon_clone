import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AiFillAmazonSquare } from "react-icons/all";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { router } from "./Utils/Paths";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const StyledCartIcon = () => (
    <AiFillAmazonSquare size={35} style={{ color: "white" }} />
  );

  // Convert the styled icon to a base64 string
  const cartIconString = renderToString(<StyledCartIcon />);
  const cartIconBase64 = btoa(cartIconString);

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
        <ToastContainer limit={10} />
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

export default App;
