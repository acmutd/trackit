import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Log from "./Components/Config/Log";

if (process.env.NODE_ENV !== "production") {
  localStorage.setItem("debug", "acm-trackit:*");
}

Log.info("the world is round", "the world is happy");

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.getElementById("example")
);
