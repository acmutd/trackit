"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * This component represents a singular tile in the interface. It has support to hold several buttons and have custom functionality for them.
 * The card also has the abillity to take in a variable number of arguments (the buttons and their text) so it can be multipurpose
 *
 */
class CardTile extends react_1.default.Component {
    render() {
        let links = this.props.data.links;
        let linkTexts = this.props.data.linkText;
        let variants = [
            "primary",
            "success",
            "warning",
            "danger",
            "dark",
            "danger",
            "light",
        ];
        // create a button with the text passed in from props
        // the onclick will be a function defined in props and passed in
        let cardLinks = linkTexts.map((item, i) => (react_1.default.createElement(react_bootstrap_1.Button, { onClick: links[i], variant: variants[i], disabled: this.props.data.disabled, key: i, className: "mr-2 ml-2" }, item)));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "floating-icon m-2 m-lg-3" },
                react_1.default.createElement(react_bootstrap_1.Card, null,
                    react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                        react_1.default.createElement(react_bootstrap_1.Card.Title, null, this.props.data.title),
                        react_1.default.createElement(react_bootstrap_1.Card.Subtitle, { className: "mb-2 text-muted" }, this.props.data.subtitle),
                        react_1.default.createElement(react_bootstrap_1.Card.Text, null, this.props.data.description),
                        react_1.default.createElement(react_bootstrap_1.ButtonGroup, null, cardLinks))))));
    }
}
exports.default = CardTile;
//# sourceMappingURL=CardTile.js.map