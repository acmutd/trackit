"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const NavBar_1 = require("../Layout/NavBar");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * Page for entering the workshop ID, based on design from <UserAuth /> and <AdminAuth />
 */
class WorkshopLogin extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            workshopID: "",
            loginError: false,
        };
        /**
         * Event listener
         */
        this.fillWorkshop = (event) => {
            this.setState({
                workshopID: event.target.value,
            });
        };
        /**
         * call method from props to verify if workshop ID exists
         */
        this.authenticate = () => {
            if (this.state.workshopID === "") {
                this.setState({
                    loginError: true,
                });
            }
            else {
                this.props.authenticate(this.state.workshopID);
            }
        };
    }
    /**
     * Update and display alert if there does not exist a workshop with the given name
     * @param {*} prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.loginError !== prevProps.loginError) {
            this.setState({
                loginError: this.props.loginError,
            });
        }
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(NavBar_1.default, null),
            react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
                react_1.default.createElement("div", { className: "m-1 mt-3 m-lg-5 mt-lg-5 p-5 floating-icon" },
                    this.state.loginError ? (react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", onClose: () => this.setState({ loginError: false }), dismissible: true }, "Invalid Workshop ID")) : (""),
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 12, md: 10 },
                            react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                                    react_1.default.createElement(react_bootstrap_1.InputGroup.Text, { id: "basic-addon1" }, "@")),
                                react_1.default.createElement(react_bootstrap_1.FormControl, { placeholder: "Workshop ID", "aria-label": "Workshop", "aria-describedby": "basic-addon1", value: this.state.name, onChange: this.fillWorkshop }))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 12, md: 2 },
                            react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.authenticate, variant: "success" }, "Go")))))));
    }
}
exports.default = WorkshopLogin;
//# sourceMappingURL=WorkshopLogin.js.map