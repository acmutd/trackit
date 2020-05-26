import * as React from "react";
import { Button, Card, ButtonGroup } from "react-bootstrap";

/**
 * This component represents a singular tile in the interface. It has support to hold several buttons and have custom functionality for them.
 * The card also has the abillity to take in a variable number of arguments (the buttons and their text) so it can be multipurpose
 *
 */

 interface Card {
   title: string;
   subtitle: string;
   description: string;
   links: Function[];
   linkText: string[];
   disabled: boolean;
 }

interface CardProps {
  data: Card
}

class CardTile extends React.Component<CardProps, {}> {
  render() {
    let links = this.props.data.links;
    let linkTexts = this.props.data.linkText;

    // create a button with the text passed in from props
    // the onclick will be a function defined in props and passed in
    let cardLinks = linkTexts.map((item: string, index: number) => (
      <Button
        onClick={links[index]}
        variant={"success"} //used to be {variants[index]}
        disabled={this.props.data.disabled}
        key={index}
        className="mr-2 ml-2"
      >
        {item}
      </Button>
    ));

    return (
      <div>
        <div className="floating-icon m-2 m-lg-3">
          <Card>
            <Card.Body>
              <Card.Title>{this.props.data.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.props.data.subtitle}
              </Card.Subtitle>
              <Card.Text>{this.props.data.description}</Card.Text>
              <ButtonGroup>{cardLinks}</ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default CardTile;
