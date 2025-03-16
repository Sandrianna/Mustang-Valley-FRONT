import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/main.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/store.ts";
import SnackbarComponent from "./components/SnackbarComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <SnackbarComponent />
    </Provider>
  </BrowserRouter>
);
