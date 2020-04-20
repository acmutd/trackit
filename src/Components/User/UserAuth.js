import React from "react";
import {
  Button,
  InputGroup,
  Row,
  Col,
  FormControl,
  Container,
} from "react-bootstrap";
import NavBar from "../Layout/NavBar";

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", // stores name of user
      workshop: "",
    };

    this.fillName = this.fillName.bind(this);
    this.fillWorkshop = this.fillWorkshop.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  fillName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  fillWorkshop(event) {
    this.setState({
      workshop: event.target.value,
    });
  }

  /**
   * Calls the authenticate function passed in from <Admin /> with the username and password stored in state
   */
  authenticate() {
    this.props.authenticate(this.state.name, this.state.workshop);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
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
                    placeholder="Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.name}
                    onChange={this.fillName}
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
                    placeholder="Workshop"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    value={this.state.workshop}
                    onChange={this.fillWorkshop}
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
