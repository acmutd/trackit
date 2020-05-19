"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
require("./index.css");
const App_1 = require("./App");
const react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.min.css");
require("react-datepicker/dist/react-datepicker.css");
react_dom_1.default.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_1.default, null)), document.getElementById("root"));
//# sourceMappingURL=index.js.map