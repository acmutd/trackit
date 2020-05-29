import * as React from "react";
import NavBar from "../Layout/NavBar";
import {
  Button,
  InputGroup,
  Row,
  Col,
  FormControl,
  Container,
  Alert,
} from "react-bootstrap";

interface WorkshopLoginProps {
  authenticate(workshop: string): void,
  loginError: boolean
}

interface WorkshopLoginState {
  workshopID: string,
  loginError: boolean
}
/**
 * Page for entering the workshop ID, based on design from <UserAuth /> and <AdminAuth />
 */
class WorkshopLogin extends React.Component<WorkshopLoginProps, WorkshopLoginState> {
  state: WorkshopLoginState = {
    workshopID: "",
    loginError: false,
  };

  /**
   * Update and display alert if there does not exist a workshop with the given name
   * @param {WorkshopLoginProps} prevProps
   */
  componentDidUpdate(prevProps: WorkshopLoginProps) {
    if (this.props.loginError !== prevProps.loginError) {
      this.setState({
        loginError: this.props.loginError,
      });
    }
  }

  /**
   * Event listener
   */
  fillWorkshop = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      workshopID: event.target.value,
    });
  };

  /**
   * call method from props to verify if workshop ID exists
   */
  authenticate = () => {
    if (this.state.workshopID === "") {
      this.setState({
        loginError: true,
      });
    } else {
      this.props.authenticate(this.state.workshopID);
    }
  };

  render() {
    return (
      <div>
        <NavBar dashboard={false} signOut={() => {console.log("placeholder function")}}/>
        <Container fluid>
          <div className="m-1 mt-3 m-lg-5 mt-lg-5 p-5 floating-icon">
            {this.state.loginError ? (
              <Alert
                variant="danger"
                onClose={() => this.setState({ loginError: false })}
                dismissible
              >
                Invalid Workshop ID
              </Alert>
            ) : (
              ""
            )}
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
                    value={this.state.workshopID}
                    onChange={this.fillWorkshop}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={12} md={2}>
                {/* The authenticate function here is the one defined in this Component and not the one passed in from <User /> */}
                <Button onClick={this.authenticate} variant="success">
                  Go
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
