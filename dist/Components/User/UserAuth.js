"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const NavBar_1 = require("../Layout/NavBar");
/**
 * Same UI as admin auth
 */
class UserAuth extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: "",
            password: "",
            loginError: false,
        };
        /**
         * Listener
         */
        this.fillEmail = (event) => {
            this.setState({
                email: event.target.value,
            });
        };
        /**
         * Listener
         */
        this.fillPassword = (event) => {
            this.setState({
                password: event.target.value,
            });
        };
        /**
         * Calls the authenticate function passed in from <User /> with the username and password stored in state
         */
        this.authenticate = () => {
            this.props.authenticate(this.state.email, this.state.password);
        };
    }
    /**
     * If an error occurred in authentication this will update
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
                    this.state.loginError ? (react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", onClose: () => this.setState({ loginError: false }), dismissible: true }, "Invalid Email or Password")) : (""),
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 12, md: 5 },
                            " ",
                            react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                                    react_1.default.createElement(react_bootstrap_1.InputGroup.Text, { id: "basic-addon1" }, "@")),
                                react_1.default.createElement(react_bootstrap_1.FormControl, { placeholder: "Email", "aria-label": "Email", "aria-describedby": "basic-addon1", value: this.state.email, onChange: this.fillEmail }))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 12, md: 5 },
                            react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                                    react_1.default.createElement(react_bootstrap_1.InputGroup.Text, { id: "basic-addon1" }, "@")),
                                react_1.default.createElement(react_bootstrap_1.FormControl, { placeholder: "Password", "aria-label": "Password", type: "password", "aria-describedby": "basic-addon1", value: this.state.password, onChange: this.fillPassword }))),
                        react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, sm: 12, md: 2 },
                            react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.authenticate, variant: "success" }, "Login")))))));
    }
}
exports.default = UserAuth;
//# sourceMappingURL=UserAuth.js.map