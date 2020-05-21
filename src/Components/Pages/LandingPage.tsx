import * as React from "react";
import Navbar from "../Layout/NavBar";
import { Container } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <div className="m-5 p-5 floating-icon">
          <h1>Welcome to TrackIT</h1>
          <p>
            Interactive real-time solution to remotely delivering event content
            and tracking user progress
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
