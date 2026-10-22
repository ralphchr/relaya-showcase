import React from "react";
import ReactDOM from "react-dom/client";
import { DemoPage } from "./sections/ShowcasePage";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/showcase.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DemoPage />
  </React.StrictMode>,
);
