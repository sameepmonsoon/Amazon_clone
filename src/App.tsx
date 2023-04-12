import { useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import { Provider } from "react-redux";
import { store } from "./store/store";
function App() {
  const [count, setCount] = useState(0);
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
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
