"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
// import { Avatar, deepOrange } from "@material-ui/core"; (later use)
/**
 * This is the <NavBar /> used at the top, uses the bootstrap components but extracted it to a separate component
 */
class NavBar extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Navlink: [
                {
                    name: "Home",
                    link: "/",
                },
                {
                    name: "Admin",
                    link: "/admin",
                },
                {
                    name: "Pricing",
                    link: "/pricing",
                },
            ],
        };
    }
    render() {
        // maps the links to be displayed at the top, eventually one of them can be like "Hello " + this.props.studentUsername
        let navlinks = this.state.Navlink.map((item, index) => (react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: item.link, key: index }, item.name)));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.Navbar, { bg: "dark", variant: "dark", expand: "md" },
                react_1.default.createElement(react_bootstrap_1.Navbar.Brand, null, "TrackIT"),
                react_1.default.createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
                react_1.default.createElement(react_bootstrap_1.Navbar.Collapse, { id: "basic-navbar-nav" },
                    react_1.default.createElement(react_bootstrap_1.Nav, { className: "mr-auto" },
                        navlinks,
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://github.com/acmutd/TrackIT/blob/master/README.md" }, "Docs")),
                    react_1.default.createElement(react_bootstrap_1.Nav, { className: "ml-auto" },
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://github.com/acmutd/TrackIT" },
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "whiteStyle", icon: free_brands_svg_icons_1.faGithub, size: "lg" })),
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://www.instagram.com/utdacm/" },
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "whiteStyle", icon: free_brands_svg_icons_1.faInstagram, size: "lg" })),
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://www.acmutd.co/" },
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "whiteStyle", icon: free_brands_svg_icons_1.faCreativeCommonsBy, size: "lg" })),
                        this.props.dashboard === true ? (react_1.default.createElement(react_bootstrap_1.Button, { variant: "dark", onClick: this.props.signOut }, "Sign Out")) : (""))))));
    }
}
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map