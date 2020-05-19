"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
/**
 * The is a Student bar that shows detailed information about a student.
 * It shows their name, their progress in the workshop and an option to see if they have submitted an alert and to download their information
 */
class StudentBar extends react_1.default.Component {
    render() {
        //makes the data dynamic by calculating how much is complete, how much is being worked on and how much is left to be finished
        //probably extract this into a function and just load 3 values into render in the future
        let maxProgress = this.props.TotalProgress;
        let percentWorkingProgress = (1 / maxProgress) * 100;
        let currentProgress = this.props.Progress;
        let percentCurrentProgress = (currentProgress / maxProgress) * 100;
        if (currentProgress === maxProgress) {
            percentWorkingProgress = 0;
        }
        let percentIncompleteProgress = 100 - percentCurrentProgress - percentWorkingProgress;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "m-2 m-lg-3 mt-3 mt-lg-5 p-4 floating-icon" },
                react_1.default.createElement(react_bootstrap_1.Nav, { justify: true, className: "flex-column flex-lg-row d-flex" },
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement("h1", null, this.props.Student_Name)),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, { className: "mt-3" },
                        react_1.default.createElement(react_bootstrap_1.ProgressBar, null,
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "success", animated: true, now: percentCurrentProgress, key: 1 }),
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "warning", animated: true, now: percentWorkingProgress, key: 2 }),
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "danger", animated: true, now: percentIncompleteProgress, key: 3 }))),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { disabled: true },
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faExclamationTriangle, size: "lg" }),
                            "\u00A0Alert")),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faDownload, size: "lg" }),
                            "\u00A0Download"))))));
    }
}
exports.default = StudentBar;
//# sourceMappingURL=StudentBar.js.map