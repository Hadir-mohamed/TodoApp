import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
    />
    <App  />
  </React.StrictMode>
);
