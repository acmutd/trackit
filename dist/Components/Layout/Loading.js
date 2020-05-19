"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Loading = () => {
    return (react_1.default.createElement("div", { style: { position: "absolute", top: "50%", right: "50%" } },
        react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", role: "status" },
            react_1.default.createElement("span", { className: "sr-only" }, "Loading..."))));
};
exports.default = Loading;
//# sourceMappingURL=Loading.js.map