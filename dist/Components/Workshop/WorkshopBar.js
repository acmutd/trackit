"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * The is a workshop bar that shows a minimized view of the information in a workshop
 * Quick look at the data available
 */
class WorkshopBar extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            expandView: this.props.expandState,
            refresh: false,
        };
        /**
         * Toggles whether the expanded view is open or not
         */
        this.switchView = () => {
            this.props.expandWindow(this.props.data.Workshop_ID);
        };
    }
    /**
     * Updates the workshop state if the props change
     * @param {*} prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.students !== prevProps.students) {
            this.setState(state => ({
                refresh: !state.refresh,
            }));
        }
    }
    render() {
        //extract the day, month, year from the date Object
        let date = null;
        let month = null;
        let year = null;
        let day = null;
        let temp = new Date(this.props.data.Date.seconds * 1000);
        if (temp != null) {
            date = temp.getDate();
            month = temp.getMonth();
            let monthsOfYear = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            month = monthsOfYear[month];
            year = temp.getFullYear();
            day = temp.getDay();
            let daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            day = daysOfWeek[day];
        }
        //compute number of students behind and at the same level of progress as admin
        let studentsAtLevel = 0;
        let studentsBehindLevel = 0;
        for (var i = 0; i < this.props.students.Progress.length; i++) {
            if (this.props.students.Progress[i] < this.props.students.Level_Enabled) {
                studentsBehindLevel++;
            }
            else {
                studentsAtLevel++;
            }
        }
        let percentAtLevel = (studentsAtLevel / this.props.students.Progress.length) * 100;
        let percentBehindLevel = (studentsBehindLevel / this.props.students.Progress.length) * 100;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "m-2 m-lg-3 mt-2 mt-lg-5 mb-3 mb-lg-5 p-4 floating-icon" },
                react_1.default.createElement(react_bootstrap_1.Nav, { justify: true, className: "flex-column flex-lg-row d-flex" },
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement("h1", null, this.props.data.Workshop_ID)),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, { className: "mt-3" },
                        react_1.default.createElement(react_bootstrap_1.ProgressBar, null,
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "success", animated: true, now: percentAtLevel, key: 1 }),
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "warning", animated: true, now: percentBehindLevel, key: 2 }),
                            react_1.default.createElement(react_bootstrap_1.ProgressBar, { striped: true, variant: "danger", animated: true, now: 0, key: 3 }))),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, { className: "mt-2" },
                        react_1.default.createElement("h3", null,
                            day,
                            " ",
                            date,
                            " ",
                            month,
                            " ",
                            year)),
                    this.state.expandView ? (react_1.default.createElement("div", null,
                        react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { onClick: this.switchView },
                                react_1.default.createElement("h3", null, "Hide View"))))) : (react_1.default.createElement("div", null,
                        react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { onClick: this.switchView },
                                react_1.default.createElement("h3", null, "Show View")))))))));
    }
}
exports.default = WorkshopBar;
//# sourceMappingURL=WorkshopBar.js.map