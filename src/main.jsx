import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/main.css";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthProvider.jsx";
import App from "./App.jsx";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);
