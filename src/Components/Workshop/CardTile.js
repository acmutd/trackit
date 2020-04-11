import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/**
 * This component represents a singular tile in the interface. It has support to hold several buttons and have custom functionality for them.
 * The card also has the abillity to take in a variable number of arguments (the buttons and their text) so it can be multipurpose
 * 
 * Author: Harsha Srikara
 * Date: 4/6/20
 */
class CardTile extends React.Component {
  render() {
    let links = this.props.data.links;
    let linkTexts = this.props.data.linkText;
    let variants = ["primary","warning","success","danger","dark","danger","light"];

     let cardLinks = linkTexts.map((item, i) => <Card.Link><Button onClick={links[i]} variant={variants[i]}>{item}</Button></Card.Link>)

    return (
      <div>
        <div className="floating-icon m-3">
          <Card>
            <Card.Body>
              <Card.Title>{this.props.data.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.props.data.subtitle}
              </Card.Subtitle>
              <Card.Text>{this.props.data.description}</Card.Text>
              {cardLinks}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default CardTile;
