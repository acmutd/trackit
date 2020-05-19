"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const NavBar_1 = require("../Layout/NavBar");
const react_bootstrap_1 = require("react-bootstrap");
const UserWelcome = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, { dashboard: true, signOut: props.signOut }),
        react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
            react_1.default.createElement(react_bootstrap_1.Card, { className: "m-5 p-5 floating-icon" },
                react_1.default.createElement("h1", null,
                    "Welcome to the ",
                    props.Workshop_Name,
                    " workshop!"),
                react_1.default.createElement("p", { className: "mt-3" },
                    "Thank you ",
                    props.user,
                    " for joining. To get started, click on the button below."),
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: () => {
                        props.markCompleted();
                    }, className: "mr-5 ml-5" }, "Get Started")),
            react_1.default.createElement(react_bootstrap_1.Card, { className: "m-5 p-5 floating-icon" },
                react_1.default.createElement("h1", { className: "mb-5" }, "Proudly designed by"),
                react_1.default.createElement(react_bootstrap_1.Image, { src: "https://www.acmutd.co/brand/Development/Banners/light_dark_background.png", fluid: true })))));
};
exports.default = UserWelcome;
//# sourceMappingURL=UserWelcome.js.map