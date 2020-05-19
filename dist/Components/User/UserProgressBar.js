"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const UserProgressBar = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_bootstrap_1.ProgressBar, { className: "mb-4" },
            react_1.default.createElement(react_bootstrap_1.ProgressBar, { variant: "success", animated: true, now: (props.userProgress * 100) / props.Number_Of_Levels, key: 1 }),
            react_1.default.createElement(react_bootstrap_1.ProgressBar, { variant: "warning", animated: true, now: ((props.Level_Enabled - props.userProgress) * 100) /
                    props.Number_Of_Levels, key: 2 }),
            react_1.default.createElement(react_bootstrap_1.ProgressBar, { variant: "danger", animated: true, now: ((props.Number_Of_Levels - props.Level_Enabled) * 100) /
                    props.Number_Of_Levels, key: 3 }))));
};
exports.default = UserProgressBar;
//# sourceMappingURL=UserProgressBar.js.map