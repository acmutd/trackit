import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));
