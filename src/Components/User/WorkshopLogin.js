import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import NavBar from "../Layout/NavBar";

class WorkshopLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopID: '',
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
      this.props.authenticate(this.state.workshopID)
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
