import React from "react";
import NavBar from "../Layout/NavBar";
import {Button, InputGroup, Row, Col, FormControl, Container, Alert} from 'react-bootstrap';

class WorkshopLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopID: '',
      loginError: false
    };

    this.fillWorkshop = this.fillWorkshop.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  fillWorkshop(event) {
    this.setState({
      workshopID: event.target.value
    });
  }

  authenticate()
  {
      if(this.props.authenticate(this.state.workshopID) === false)
        {
          this.setState({
            loginError: true
          })
        }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
          {this.state.loginError ? (
              <Alert variant="danger" onClose = {() => this.setState({loginError: false})} dismissible>Invalid Workshop ID</Alert>
            ) : ("")}
            <Row>
              {/* Username text field */}
              <Col xs={12} sm={12} md={10}>
                {/* bootstrap size makes everything be on one line on large screens and vertical on smaller displays */}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Workshop ID"
                    aria-label="Workshop"
                    aria-describedby="basic-addon1"
                    value={this.state.name}
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

export default WorkshopLogin;
