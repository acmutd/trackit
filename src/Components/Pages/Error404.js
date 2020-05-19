import * as React from "react";
import Navbar from "../Layout/NavBar";
import { Container } from "react-bootstrap";
import error404 from "../../assets/404.png";

/**
 * 404 error page, will get rendered on any path that is not defined
 */
class Error404 extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            <h1>Whoops...</h1>
            <p>
              Beep boop, looks like we ran into an error. The{" "}
              <strong>infamous Error 404.</strong>
            </p>
            <img src={error404} alt="404 Error"></img>
          </div>
        </Container>
      </div>
    );
  }
}

export default Error404;
