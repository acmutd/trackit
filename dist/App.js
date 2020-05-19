"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Admin_1 = require("./Components/Admin/Admin");
const User_1 = require("./Components/User/User");
const Pricing_1 = require("./Components/Pages/Pricing");
const Error404_1 = require("./Components/Pages/Error404");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("./Components/Firebase/firebase");
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: (props) => react_1.default.createElement(User_1.default, { database: firebase_1.default }), exact: true }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/admin", render: (props) => react_1.default.createElement(Admin_1.default, { database: firebase_1.default }), exact: true }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/pricing", component: Pricing_1.default, exact: true }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", component: Error404_1.default, exact: true }))));
}
exports.default = App;
//# sourceMappingURL=App.js.map