import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>TrackIT</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link>Features</Nav.Link>
                            <Nav.Link>Pricing</Nav.Link>
                        </Nav>

                        <Nav className="ml-auto">
                            {/* className="whiteStyle" will set the color to white */}
                            <Nav.Link><FontAwesomeIcon className="whiteStyle" icon={faFacebook} size="lg"/></Nav.Link>
                            <Nav.Link><FontAwesomeIcon className="whiteStyle" icon={faGithub} size="lg"/></Nav.Link>
                            <Nav.Link><FontAwesomeIcon className="whiteStyle" icon={faLinkedin} size="lg"/></Nav.Link>
                        </Nav>
                    </Navbar>
            </div>
        );
    }
}

export default NavBar;