import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { deepOrange } from '@material-ui/core/colors';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * This is the <NavBar /> used at the top, uses the bootstrap components but extracted it to a separate component
 * Eventually we can customize it to show the username displayed at the top or something like that
 *
 * Author: Harsha Srikara
 * Date: 3/22/20
 */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Navlink: ["Home", "Features", "Price", "Design"]
    };
  }

  render() {
    // maps the links to be displayed at the top, eventually one of them can be like "Hello " + this.props.studentUsername
    let navlinks = this.state.Navlink.map(item => <Nav.Link>{item}</Nav.Link>);
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand>TrackIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">{navlinks}</Nav>

            <Nav className="ml-auto">
              {/* className="whiteStyle" will set the color to white */}
              <Nav.Link>
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faFacebook}
                  size="lg"
                />
              </Nav.Link>
              <Nav.Link>
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faGithub}
                  size="lg"
                />
              </Nav.Link>
              <Nav.Link>
                <FontAwesomeIcon
                  className="whiteStyle"
                  icon={faLinkedin}
                  size="lg"
                />
              </Nav.Link>
              {/* <Nav.Link>
                <Avatar>H</Avatar>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
