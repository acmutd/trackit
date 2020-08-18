import * as React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { faGithub, faInstagram, faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutAction } from "../../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import app from "../../config/firebase";

// import { Avatar, deepOrange } from "@material-ui/core"; (later use)

interface NavBarProps {
  loggedIn: boolean;
  auth0: any;
  signOutRedux: any;
}

type navlink = {
  name: string;
  link: string;
};

const Navlink: navlink[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
];
const navlinks = Navlink.map((item, index) => (
  <Nav.Link href={item.link} key={index}>
    {item.name}
  </Nav.Link>
));

/**
 * This is the <NavBar /> used at the top, uses the bootstrap components but extracted it to a separate component
 */
class NavBar extends React.Component<NavBarProps, Record<string, unknown>> {
  signOut = () => {
    const { logout } = this.props.auth0;
    app
      .auth()
      .signOut()
      .then(() => {
        logout();
        this.props.signOutRedux();
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        console.log({
          error: error,
          message: "Error signing out the user",
        });
      });
  };

  render(): JSX.Element {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand>TrackIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {navlinks}
              <Nav.Link href="https://github.com/acmutd/TrackIT/blob/master/README.md">Docs</Nav.Link>
            </Nav>

            <Nav className="ml-auto">
              {/* className="whiteStyle" will set the color to white */}
              <Nav.Link href="https://github.com/acmutd/TrackIT">
                <FontAwesomeIcon className="whiteStyle" icon={faGithub} size="lg" />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/utdacm/">
                <FontAwesomeIcon className="whiteStyle" icon={faInstagram} size="lg" />
              </Nav.Link>
              <Nav.Link href="https://www.acmutd.co/">
                <FontAwesomeIcon className="whiteStyle" icon={faCreativeCommonsBy} size="lg" />
              </Nav.Link>
              {this.props.loggedIn ? (
                <Button variant="dark" onClick={() => this.signOut()}>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOutRedux: () => {
      dispatch(logoutAction());
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.authenticateReducer.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(NavBar));
