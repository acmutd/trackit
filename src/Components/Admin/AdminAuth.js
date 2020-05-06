import React from "react";
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

/**
 * UI Component that contains two text fields to enter username and password as well as a submit button
 *
 * Author: Harsha Srikara
 * Date: 4/2/20
 */
class AdminAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", //stores username
      password: "", //stores password
      loginError: false
    };

    this.fillUsername = this.fillUsername.bind(this);
    this.fillPassword = this.fillPassword.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidUpdate(prevProps)
  {
      if(this.props.loginError !== prevProps.loginError)
      {
          this.setState({
              loginError: this.props.loginError
          })
      }
  }

  /**
   * Saves username to the component state
   *
   * @param {*} event contains target value from the username text field
   */
  fillUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  /**
   * Saves password to the component state
   *
   * @param {*} event contains target value from the password text field
   */
  fillPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  /**
   * Calls the authenticate function passed in from <Admin /> with the username and password stored in state
   */
  authenticate() 
  {
    this.props.authenticate(this.state.username, this.state.password)
  }

  setShow(show) {
    this.setState({
      loginError: show
    });
  }

  render() {

    return (
      <div>
        <NavBar/>
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            {this.state.loginError ? (
              <Alert variant="danger" onClose = {() => this.setShow(false)} dismissible>Invalid Username or Password</Alert>
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
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type="email"
                    value={this.state.username}
                    onChange={this.fillUsername}
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
                    aria-describedby="basic-addon1"
                    type="password"
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

export default AdminAuth;
