// TODO
import React from "react";
import NavBar from "../Layout/NavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";

class UserDash extends React.Component {
    constructor(props) {
        super(props);

            this.state = 
          {
              user: '',
              workshop_data: this.props.workshop_data,
              userProgress: 0,
              adminProgress: 4,
              currentPage: 0
          }

        this.previousLevel = this.previousLevel.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.markCompleted = this.markCompleted.bind(this);
    }

nextLevel()
{
    this.setState(function(state, props) {
        return {
          currentPage: state.currentPage + 1
        };
      });
}

previousLevel()
{
    this.setState(function(state, props) {
        return {
            currentPage: state.currentPage - 1
        };
      });
}

markCompleted()
{
    // update database on current user progress
    this.setState(function(state, props) {
        return {
            userProgress: state.userProgress + 1
        };
      });
}

updateAdminProgress()
{
    // get data from db
}

    render() {
        let workshop_levels = this.state.workshop_data.Level_Descriptions.map(function(item, index)
        {
            if(this.userProgress > index)
            {
                return(
                    <Col key = {index}>
                        <Card bg = 'success'>
                            <Card.Header>{item}</Card.Header>
                        </Card>
                    </Col>
                )
            }
            else
            {
                return(
                    <Col key = {index}>
                        <Card>
                            <Card.Header>{item}</Card.Header>
                        </Card>
                    </Col>
                )
            }        
        }, this.state);

        let workshop_level_text = this.state.workshop_data.level_text[this.state.currentPage];
        let workshop_level_title = this.state.workshop_data.Level_Descriptions[this.state.currentPage];

        var displayMarkCompleted = (this.state.userProgress === this.state.currentPage && !displayNext);
        var displayPrevious = (this.state.currentPage != 0);
        var displayNext = (this.state.adminProgress > this.state.userProgress && 
            this.state.userProgress > this.state.currentPage)

      return (
        <div>
            <NavBar /> 
            <Container fluid className = "text-center p-3">
                <Row className = 'm-3 mb-5'>{workshop_levels}</Row>
                <ProgressBar className = 'mb-4'>
                    <ProgressBar variant = 'success' animated now = {this.state.userProgress * 100 / this.state.workshop_data.Number_Of_Levels}  key={1}/>
                    <ProgressBar  variant = 'warning' animated now = {(this.state.adminProgress - this.state.userProgress) * 100 / this.state.workshop_data.Number_Of_Levels}  key={2}/>
                    <ProgressBar variant = 'danger' animated now = {(this.state.workshop_data.Number_Of_Levels - this.state.adminProgress) * 100 / this.state.workshop_data.Number_Of_Levels}  key={3}/>
                </ProgressBar>
                <Card className = 'mt-4 floating-icon'>
                    <Card.Header className = 'text-left p-3 mt-2'>{this.state.currentPage === this.state.workshop_data.Number_Of_Levels ? 
                                'Workshop Complete!' : workshop_level_title}</Card.Header>
                    <Card.Body className = 'text-left px-3 mb-3'>{workshop_level_text}</Card.Body>
                    <Row>
                        <Col className = ''>
                            {displayPrevious ? 
                            (<Button className = 'float-left m-3' variant = 'primary' onClick = {this.previousLevel}>Previous</Button>) : ('') }
                        </Col>
                        <Col>
                            {displayMarkCompleted ?
                            (<Button className = 'm-3 float-center' variant = 'primary' onClick = {this.markCompleted}>Mark as Completed</Button>) : ('')}
                        </Col>
                        <Col className = 'mx-1 mr-0'>
                            {displayNext ?
                            (<Button className = 'm-3 float-right' variant = 'primary' onClick = {this.nextLevel}>Next</Button>) : ('')}
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
      );
    }
  }

export default UserDash;