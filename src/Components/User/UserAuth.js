import React from "react";
import {
  Button,
  InputGroup,
  Row,
  Col,
  FormControl,
  Container,
  Alert
} from "react-bootstrap";
import NavBar from "../Layout/NavBar";

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", // stores name of user
      password: "",
      loginError: false
    };

    this.fillEmail = this.fillEmail.bind(this);
    this.fillPassword = this.fillPassword.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  fillEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  fillPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  /**
   * Calls the authenticate function passed in from <Admin /> with the username and password stored in state
   */
  authenticate() {
    if(this.props.authenticate(this.state.email, this.state.password) === false)
    {
      this.setShow(true)
    }
  }

  setShow(show) {
    this.setState({
      loginError: show
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
          {this.state.loginError ? (
              <Alert variant="danger" onClose = {() => this.setShow(false)} dismissible>Invalid Email or Password</Alert>
            ) : ("")}
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
                    placeholder="password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    value={this.state.password}
                    onChange={this.fillPassword}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={12} md={2}>
                {/* The authenticate function here is the one defined in this Component and not the one passed in from <Admin /> */}
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
