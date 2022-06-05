import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import Components from "./components";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster position="top-center" reverseOrder={false} />
      <Components />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
