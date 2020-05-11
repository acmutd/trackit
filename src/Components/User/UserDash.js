import React from "react";
import NavBar from "../Layout/NavBar";
import {
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Container,
} from "react-bootstrap";

/**
 * UI for the user dashboard
 */
class UserDash extends React.Component {
  state = {
    user: "",
    workshop_data: this.props.workshop_data,
    userProgress: this.props.savedProgress,
    currentPage: this.props.savedProgress - 1,
    Level_Enabled: this.props.Level_Enabled,
  };

  /**
   * Remove progress listener if the page crashes
   */
  componentWillUnmount() {
    if (this.props.progressListener) this.props.progressListener();
  }

  // lifecycle method that is invoked anytime the component props are updated
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        userProgress: this.props.savedProgress,
        currentPage: this.props.savedProgress - 1,
        Level_Enabled: this.props.Level_Enabled,
      });
    }
  }

  // increments current level by 1. This is not their overall progress, but the stage which they are viewing.
  nextLevel = () => {
    this.setState(state => ({
        currentPage: state.currentPage + 1,
    }));
  }

  // decrements current level by 1. This is not their overall progress, but the stage which they are viewing.
  previousLevel = () => {
    this.setState(state => ({
        currentPage: state.currentPage - 1,
    }));
  }

  // marks current stage completed and sends data to database.
  markCompleted = () => {
    console.log(this.state.userProgress + " " + this.state.currentPage);
    // update database on current user progress
    this.setState(state => ({
        userProgress: state.userProgress + 1,
      }),
      this.props.updateUserProgress(this.state.userProgress + 1)
    );
  }

  render() {
    let workshop_levels = this.state.workshop_data.Level_Titles.map((item, index) => {
      if (this.currentPage === index) {
        return (
          <Col key={index}>
            <Card className="floating-icon" bg="success">
              <Card.Header>{item}</Card.Header>
            </Card>
          </Col>
        );
      } else if (this.userProgress > index) {
        return (
          <Col key={index}>
            <Card bg="success">
              <Card.Header>{item}</Card.Header>
            </Card>
          </Col>
        );
      } else {
        return (
          <Col key={index}>
            <Card>
              <Card.Header>{item}</Card.Header>
            </Card>
          </Col>
        );
      }
    },
    this.state);

    let workshop_level_text = this.state.workshop_data.Level_Descriptions[
      this.state.currentPage
    ];
    let workshop_level_title = this.state.workshop_data.Level_Titles[
      this.state.currentPage
    ];

    var displayNext =
      (this.state.Level_Enabled > this.state.userProgress &&
        this.state.userProgress > this.state.currentPage) ||
      (this.state.Level_Enabled === this.state.userProgress &&
        this.state.currentPage < this.state.userProgress - 1);
    var displayPrevious = this.state.currentPage !== 0;
    var displayMarkCompleted =
      this.state.userProgress === this.state.currentPage && !displayNext;

    return (
      <div>
        <NavBar dashboard={true} signOut={this.props.signOut} />
        <Container fluid className="text-center p-3">
          <Row className="m-3 mb-5">{workshop_levels}</Row>
          <ProgressBar className="mb-4">
            <ProgressBar
              variant="success"
              animated
              now={
                (this.state.userProgress * 100) /
                this.state.workshop_data.Number_Of_Levels
              }
              key={1}
            />
            <ProgressBar
              variant="warning"
              animated
              now={
                ((this.state.Level_Enabled - this.state.userProgress) * 100) /
                this.state.workshop_data.Number_Of_Levels
              }
              key={2}
            />
            <ProgressBar
              variant="danger"
              animated
              now={
                ((this.state.workshop_data.Number_Of_Levels -
                  this.state.Level_Enabled) *
                  100) /
                this.state.workshop_data.Number_Of_Levels
              }
              key={3}
            />
          </ProgressBar>
          <Card className="mt-4 floating-icon">
            <Card.Header className="text-left p-3 mt-2">
              {this.state.currentPage ===
              this.state.workshop_data.Number_Of_Levels
                ? "Workshop Complete!"
                : workshop_level_title}
            </Card.Header>
            <Card.Body className="text-left px-3 mb-3">
              {workshop_level_text}
            </Card.Body>
            <Row>
              <Col className="">
                {displayPrevious ? (
                  <Button
                    className="float-left m-3"
                    variant="primary"
                    onClick={this.previousLevel}
                  >
                    Previous
                  </Button>
                ) : (
                  ""
                )}
              </Col>
              <Col>
                {displayMarkCompleted ? (
                  <Button
                    className="m-3 float-center"
                    variant="primary"
                    onClick={this.markCompleted}
                  >
                    Mark as Completed
                  </Button>
                ) : (
                  ""
                )}
              </Col>
              <Col className="mx-1 mr-0">
                {displayNext ? (
                  <Button
                    className="m-3 float-right"
                    variant="primary"
                    onClick={this.nextLevel}
                  >
                    Next
                  </Button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    );
  }
}

export default UserDash;
