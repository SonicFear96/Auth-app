import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Router } from "./Router";

render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
