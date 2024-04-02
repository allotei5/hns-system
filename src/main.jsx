import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";
import { AlertProvider } from "./contexts/AlertContext.jsx";
import { FormDataProvider } from "./contexts/FormDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <FormDataProvider>
        <App />
      </FormDataProvider>
    </AlertProvider>
  </React.StrictMode>
);
