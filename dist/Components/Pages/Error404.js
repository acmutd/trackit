"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error404 = void 0;
const react_1 = require("react");
const NavBar_1 = require("../Layout/NavBar");
const react_bootstrap_1 = require("react-bootstrap");
const _404_png_1 = require("../../assets/404.png");
/**
 * 404 error page, will get rendered on any path that is not defined
 */
class Error404 extends react_1.Component {
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(NavBar_1.default, null),
            react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
                react_1.default.createElement("div", { className: "m-5 p-5 floating-icon" },
                    react_1.default.createElement("h1", null, "Whoops..."),
                    react_1.default.createElement("p", null,
                        "Beep boop, looks like we ran into an error. The",
                        " ",
                        react_1.default.createElement("strong", null, "infamous Error 404.")),
                    react_1.default.createElement("img", { src: _404_png_1.default, alt: "404 Error" })))));
    }
}
exports.Error404 = Error404;
exports.default = Error404;
//# sourceMappingURL=Error404.js.map