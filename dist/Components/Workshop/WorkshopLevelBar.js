"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const react_bootstrap_1 = require("react-bootstrap");
const Add_1 = require("@material-ui/icons/Add");
const Remove_1 = require("@material-ui/icons/Remove");
/**
 * Administrative toolbar to control workshop settings such as enabling a workshop, disabling a workshop, clearing all students to reset a workshop
 * Also contains a slider to enable workshop levels
 */
class WorkshopLevelBar extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            workshopLevel: this.props.Workshop_Level,
            enabled: this.props.enabled,
        };
        /**
         * Calls function passed in from props
         */
        this.incrementLevel = () => {
            if (this.state.workshopLevel < this.props.maxLevel) {
                this.setState((state) => ({ workshopLevel: state.workshopLevel + 1 }));
                this.props.incrementLevel();
            }
        };
        /**
         * Calls function passed in from props
         */
        this.decrementLevel = () => {
            if (this.state.workshopLevel > 1) {
                this.setState((state) => ({ workshopLevel: state.workshopLevel - 1 }));
                this.props.decrementLevel();
            }
        };
        /**
         * Calls function passed in from props
         */
        this.enableWorkshop = () => {
            this.setState({ enabled: true });
            this.props.enableWorkshop();
        };
        /**
         * Calls function passed in from props
         */
        this.disableWorkshop = () => {
            this.setState({ enabled: false });
            this.props.disableWorkshop();
        };
    }
    /**
     * Updates if there's a change to the props passed in
     * @param {*} prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                workshopLevel: this.props.Workshop_Level,
                enabled: this.props.enabled,
            });
        }
    }
    render() {
        function valuetext(value) {
            return value;
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "m-2 mt-3 m-lg-3 mt-lg-5 p-4 floating-icon" },
                react_1.default.createElement(react_bootstrap_1.Nav, { justify: true, className: "flex-column flex-lg-row d-flex" },
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement("h1", null,
                            react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: "Manage&nbspWorkshop" } }))),
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.enableWorkshop, variant: "success", size: "lg", disabled: this.state.enabled },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Enable&nbspWorkshop",
                                            } }))))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.disableWorkshop, variant: "warning", size: "lg", disabled: !this.state.enabled },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Disable&nbspWorkshop",
                                            } }))))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.props.addEditWorkshop, variant: "primary", size: "lg" },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Edit&nbspWorkshop",
                                            } }))))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.props.exportWorkshop, variant: "secondary", size: "lg" },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Export&nbspWorkshop",
                                            } }))))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.props.clearAllStudents, variant: "dark", size: "lg" },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Clear&nbspAll&nbspStudents",
                                            } }))))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 6, md: 4, lg: 2 },
                            react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                                react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.props.deleteWorkshop, variant: "danger", size: "lg" },
                                        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                                                __html: "Delete&nbspWorkshop",
                                            } }))))))),
                react_1.default.createElement("hr", null),
                react_1.default.createElement(react_bootstrap_1.Nav, { justify: true, className: "flex-column flex-md-row d-flex" },
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement("div", { className: "mt-2" },
                            react_1.default.createElement("h3", null,
                                "Workshop Level: ",
                                this.state.workshopLevel))),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement("div", { className: "mt-3" },
                            react_1.default.createElement(core_1.Slider, { value: this.state.workshopLevel, getAriaValueText: valuetext, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, marks: true, min: 1, max: this.props.maxLevel, disabled: !this.state.enabled }))),
                    react_1.default.createElement(react_bootstrap_1.Nav.Item, null,
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, null,
                            react_1.default.createElement(core_1.Fab, { color: "primary", "aria-label": "remove", className: "ml-2 mr-2", disabled: !this.state.enabled },
                                react_1.default.createElement(Remove_1.default, { onClick: this.decrementLevel })),
                            react_1.default.createElement(core_1.Fab, { color: "primary", "aria-label": "add", className: "ml-2 mr-2", disabled: !this.state.enabled },
                                react_1.default.createElement(Add_1.default, { onClick: this.incrementLevel }))))))));
    }
}
exports.default = WorkshopLevelBar;
//# sourceMappingURL=WorkshopLevelBar.js.map