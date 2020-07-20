import * as React from "react";
import { useEffect } from "react";
import Navbar from "../components/Layout/NavBar";
import Loading from "../components/Layout/Loading";
import { Container, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, is } = useAuth0();

  /**
   * Imitates lifecycle method, method only gets called when the value of isAuthenticated changes
   */
  useEffect(
    function () {
      if (!isLoading && isAuthenticated) {
      }
    },
    [isAuthenticated, isLoading]
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            <h1>Welcome to TrackIT</h1>
            <p>
              Interactive real-time solution to remotely delivering event
              content and tracking user progress
            </p>
            <Button onClick={loginWithRedirect}>sign in with acm</Button>
          </div>
        </Container>
      </div>
    );
  }
};

export default LandingPage;
