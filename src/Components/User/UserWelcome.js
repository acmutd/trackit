import React from "react";
import NavBar from "../Layout/NavBar";
import { Container, Jumbotron, Button } from "react-bootstrap";

const UserWelcome = (props) => {
  return (
    <div>
      <NavBar dashboard={true} signOut={props.signOut} />
      <Container fluid>
        <Jumbotron className="px-4 mx-3 my-3">
          <h1>
            Welcome to {props.Workshop_Name} {props.username}
          </h1>
          <br />
          <p>
            Thank you for joining. To get started, click on the button below.
          </p>
          <br />
          <Button
            variant="primary"
            onClick={() => {
              props.markCompleted();
            }}
          >
            Get Started
          </Button>
        </Jumbotron>
      </Container>
    </div>
  );
};

export default UserWelcome;
