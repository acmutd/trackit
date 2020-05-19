"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pricing = void 0;
const react_1 = require("react");
const NavBar_1 = require("../Layout/NavBar");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * Displayes a grid of pricing options for the product
 */
class Pricing extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiers: [
                {
                    name: "Free",
                    price: "$0/mo",
                    perks: [
                        "Up to 5 Workshop Levels",
                        "Limited to 20 students",
                        "No concurrent workshops",
                    ],
                },
                {
                    name: "Pro",
                    price: "$10/mo",
                    perks: [
                        "Up to 25 Workshop Levels",
                        "Limited to 100 students",
                        "5 concurrent workshops",
                    ],
                },
                {
                    name: "Enterprise",
                    price: "$50/mo",
                    perks: [
                        "Unlimited Workshop Levels",
                        "Unlimited students",
                        "Unlimited concurrent workshops",
                    ],
                },
            ],
        };
    }
    render() {
        let tierCards = this.state.tiers.map((item, index) => (react_1.default.createElement(react_bootstrap_1.Card, { key: index, style: { width: "18rem" }, className: "floating-icon" },
            react_1.default.createElement(react_bootstrap_1.Card.Img, { variant: "top" }),
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, null, item.name),
                react_1.default.createElement(react_bootstrap_1.Card.Text, null, item.price)),
            react_1.default.createElement(react_bootstrap_1.ListGroup, { className: "list-group-flush" },
                react_1.default.createElement(react_bootstrap_1.ListGroupItem, null, item.perks[0]),
                react_1.default.createElement(react_bootstrap_1.ListGroupItem, null, item.perks[1]),
                react_1.default.createElement(react_bootstrap_1.ListGroupItem, null, item.perks[2])),
            react_1.default.createElement(react_bootstrap_1.Button, null, "Sign Up!"))));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(NavBar_1.default, null),
            react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
                react_1.default.createElement("div", { className: "m-5 p-5 floating-icon" },
                    react_1.default.createElement("h1", null, "Pricing"),
                    react_1.default.createElement("p", { className: "mt-3" }, "We try our best to offer our services for free for personal use as one of our core beliefs is free education. However, nothing is ever truly free. We still need to host this application somewhere and hosting costs money. That is why we only require organizations and companies to explore the options we have available to see what suits them well."),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(react_bootstrap_1.CardDeck, null, tierCards)))));
    }
}
exports.Pricing = Pricing;
exports.default = Pricing;
//# sourceMappingURL=Pricing.js.map