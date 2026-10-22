import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/showcase.css";
import "./styles/demo.css";
import "./styles/feature-tour.css";
import "./styles/source-landing/tokens.css";
import "./styles/source-landing/base.css";
import "./styles/source-landing/landing.css";
import "./styles/showcase-extension.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
