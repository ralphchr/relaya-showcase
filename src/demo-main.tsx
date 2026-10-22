import React from "react";
import ReactDOM from "react-dom/client";
import { DemoPage } from "./sections/DemoPage";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/showcase.css";
import "./styles/demo.css";
import "./styles/clean.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DemoPage />
  </React.StrictMode>,
);
