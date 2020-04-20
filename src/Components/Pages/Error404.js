import React, { Component } from "react";
import Navbar from "../Layout/NavBar";
import { Container } from "react-bootstrap";
import error404 from "../../assets/404.png";

export class Error404 extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            <h1>Whoops...</h1>
            <p>
              Beep boop, looks like we ran into an error. The{" "}
              <emphasis>infamous</emphasis> <strong>Error 404.</strong>
            </p>
            <img src={error404} alt="404 Error"></img>
          </div>
        </Container>
      </div>
    );
  }
}

export default Error404;
