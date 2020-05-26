import * as  React from "react";
import {
  Button,
  InputGroup,
  Row,
  Col,
  FormControl,
  Container,
  Alert,
} from "react-bootstrap";
import NavBar from "../Layout/NavBar";

interface AuthProp {
  loginError: boolean,
  authenticate(email: string, password: string): void,
};

interface AuthState {
  email: string,
  password: string,
  loginError: boolean
}
/**
 * Same UI as admin auth
 */
class UserAuth extends React.Component<AuthProp, AuthState> {
  state: AuthState = {
    email: "", // stores name of user
    password: "",
    loginError: false,
  };

  /**
   * If an error occurred in authentication this will update
   * @param {*} prevProps 
   */
  componentDidUpdate(prevProps: AuthProp) {
    if (this.props.loginError !== prevProps.loginError) {
      this.setState({
        loginError: this.props.loginError,
      });
    }
  }

  /**
   * Listener
   */
  fillEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value,
    });
  };

  /**
   * Listener
   */
  fillPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value,
    });
  };

  /**
   * Calls the authenticate function passed in from <User /> with the username and password stored in state
   */
  authenticate = () => {
    this.props.authenticate(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="m-1 mt-3 m-lg-5 mt-lg-5 p-5 floating-icon">
            {this.state.loginError ? (
              <Alert
                variant="danger"
                onClose={() => this.setState({ loginError: false })}
                dismissible
              >
                Invalid Email or Password
              </Alert>
            ) : (
              ""
            )}
            <Row>
              {/* Username text field */}
              <Col xs={12} sm={12} md={5}>
                {" "}
                {/* bootstrap size makes everything be on one line on large screens and vertical on smaller displays */}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    value={this.state.email}
                    onChange={this.fillEmail}
                  />
                </InputGroup>
              </Col>
              {/* Password text field */}
              <Col xs={12} sm={12} md={5}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    type="password"
                    aria-describedby="basic-addon1"
                    value={this.state.password}
                    onChange={this.fillPassword}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={12} md={2}>
                {/* The authenticate function here is the one defined in this Component and not the one passed in from <User /> */}
                <Button onClick={this.authenticate} variant="success">
                  Login
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default UserAuth;
