import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardTile.css';

class CardTile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="floating-icon m-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.props.data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{this.props.data.subtitle}</Card.Subtitle>
                            <Card.Text>{this.props.data.description}</Card.Text>
                            <Card.Link href={this.props.data.linkone}>{this.props.data.linkonetext}</Card.Link>
                            <Card.Link href={this.props.data.linktwo}>{this.props.data.linktwotext}</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CardTile;