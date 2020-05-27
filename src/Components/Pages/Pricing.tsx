import * as React from "react";
import Navbar from "../Layout/NavBar";
import {
  Button,
  Container,
  Card,
  CardDeck,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

type tier = {
  name: string;
  price: string;
  perks: string[];
};

interface PricingState {
  tiers: tier[];
}

/**
 * Displayes a grid of pricing options for the product
 */
class Pricing extends React.Component<{}, PricingState> {
  state: PricingState = {
    tiers: [
      {
        name: "Free",
        price: "$0/mo",
        perks: [
          "Up to 5 Workshop Levels",
          "Limited to 20 students",
          "No concurrent workshops",
        ],
      },
      {
        name: "Pro",
        price: "$10/mo",
        perks: [
          "Up to 25 Workshop Levels",
          "Limited to 100 students",
          "5 concurrent workshops",
        ],
      },
      {
        name: "Enterprise",
        price: "$50/mo",
        perks: [
          "Unlimited Workshop Levels",
          "Unlimited students",
          "Unlimited concurrent workshops",
        ],
      },
    ],
  };

  render() {
    let tierCards = this.state.tiers.map((item, index) => (
      <Card key={index} style={{ width: "18rem" }} className="floating-icon">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.price}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{item.perks[0]}</ListGroupItem>
          <ListGroupItem>{item.perks[1]}</ListGroupItem>
          <ListGroupItem>{item.perks[2]}</ListGroupItem>
        </ListGroup>
        <Button>Sign Up!</Button>
      </Card>
    ));

    return (
      <div>
        <Navbar 
          dashboard = {false}
          signOut={() => {
            console.log("placeholder function");
          }}
        />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            <h1>Pricing</h1>
            <p className="mt-3">
              We try our best to offer our services for free for personal use as
              one of our core beliefs is free education. However, nothing is
              ever truly free. We still need to host this application somewhere
              and hosting costs money. That is why we only require organizations
              and companies to explore the options we have available to see what
              suits them well.
            </p>
            <br />
            <CardDeck>{tierCards}</CardDeck>
          </div>
        </Container>
      </div>
    );
  }
}

export default Pricing;
