import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import {
  faGithub,
  faInstagram,
  faCreativeCommonsBy,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Avatar, deepOrange } from "@material-ui/core"; (later use)

/**
 * This is the <NavBar /> used at the top, uses the bootstrap components but extracted it to a separate component
 */
class NavBar extends React.Component {
  state = {
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

  render() {
    // maps the links to be displayed at the top, eventually one of them can be like "Hello " + this.props.studentUsername
    let navlinks = this.state.Navlink.map((item) => (
      <Nav.Link href={item.link}>{item.name}</Nav.Link>
    ));
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand>TrackIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {navlinks}
              <Nav.Link href="https://github.com/acmutd/TrackIT/blob/master/README.md">
                Docs
              </Nav.Link>
            </Nav>

            <Nav className="ml-auto">
              {/* className="whiteStyle" will set the color to white */}
              <Nav.Link href="https://github.com/acmutd/TrackIT">
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faGithub}
                  size="lg"
                />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/utdacm/">
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faInstagram}
                  size="lg"
                />
              </Nav.Link>
              <Nav.Link href="https://www.acmutd.co/">
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faCreativeCommonsBy}
                  size="lg"
                />
              </Nav.Link>
              {this.props.dashboard === true ? (
                <Button variant="dark" onClick={this.props.signOut}>
                  Sign Out
                </Button>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
