import * as React from "react";
import NavBar from "../Layout/NavBar";
import { Container, Card, Button, Image } from "react-bootstrap";

interface WelcomeProps {
  Workshop_Name: string,
  user: string,
  markCompleted(): void
}

const UserWelcome = (props: WelcomeProps) => {
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Card className="m-5 p-5 floating-icon">
          <h1>Welcome to the {props.Workshop_Name} workshop!</h1>
          <p className="mt-3">
            Thank you {props.user} for joining. To get started, click on the
            button below.
          </p>
          <br />
          <Button
            variant="primary"
            onClick={() => {
              props.markCompleted();
            }}
            className="mr-5 ml-5"
          >
            Get Started
          </Button>
        </Card>
        <Card className="m-5 p-5 floating-icon">
          <h1 className="mb-5">Proudly designed by</h1>
          <Image
            src="https://www.acmutd.co/brand/Development/Banners/light_dark_background.png"
            fluid
          />
        </Card>
      </Container>
    </div>
  );
};

export default UserWelcome;
