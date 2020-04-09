// TODO
import React from "react";
import NavBar from "../Layout/NavBar";
import CardTile from "../Workshop/CardTile";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Buttom from "react-bootstrap/Button";
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";




class User extends React.Component {
    constructor(props) {
        super(props);

        let first = {
            Level_Descriptions: ["info part 1", "info part 2", "info part 3", 'part 4', 'part 5'],
            Number_Of_Levels: 5,
            Workshop_ID: "firebase",
            Workshop_Name: "firebase",
            Day: "Monday",
            Date: "16",
            Month: "March",
            Year: "2020",
            level_text: ['Setup the project', 'Researc the project', 'Learn the Project', 
                        'Do the Project', 'Present the Project']
            };

          this.state = 
          {
              workshop_data: first,
              progress: 0
          }

        this.previousLevel = this.previousLevel.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
    }

nextLevel()
{
    if(this.state.progress === this.state.workshop_data.Number_Of_Levels)
        return;
    this.setState(function(state, props) {
        return {
          progress: state.progress + 1
        };
      });
}

previousLevel()
{
    if(this.state.progress === 0)
        return;
    this.setState(function(state, props) {
        return {
            progress: state.progress - 1
        };
      });
}

    render() {

        let workshop_levels = this.state.workshop_data.Level_Descriptions.map(function(item, index)
        {
            if(this.progress > index)
            {
                return(
                    <Col>
                        <Card bg = 'success'>
                            <Card.Header>{item}</Card.Header>
                        </Card>
                    </Col>
                )
            }
            else
            {
                return(
                    <Col>
                        <Card>
                            <Card.Header>{item}</Card.Header>
                        </Card>
                    </Col>
                )
            }        
        }, this.state);

        let workshop_level_text = this.state.workshop_data.level_text[this.state.progress];
        let workshop_level_title = this.state.workshop_data.Level_Descriptions[this.state.progress];

      return (
        <div>
            <NavBar />
            <Container className = "text-center p-3">
                <Row className = 'm-3 mb-5'>{workshop_levels}</Row>
                <ProgressBar className = 'mb-4' animated now = {this.state.progress * 100 / this.state.workshop_data.Number_Of_Levels}/>
            </Container>
            <Container>
                <Card>
                    <Card.Header className = 'text-left p-3 mt-2'>{this.state.progress === this.state.workshop_data.Number_Of_Levels ? 
                                'Workshop Complete!' : workshop_level_title}</Card.Header>
                    <Card.Body className = 'text-left px-3 mb-3'>{workshop_level_text}</Card.Body>
                    <Row>
                        <Col className = ''>
                            <Button className = 'float-left m-3' variant = 'primary' onClick = {this.previousLevel}>Previous</Button>
                        </Col>
                        <Col className = 'mx-1 mr-0'>
                            <Button className = 'm-3 float-right' variant = 'primary' onClick = {this.nextLevel}>Next</Button>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
      );
    }
  }

export default User;