import React from "react";
import NavBar from "../Layout/NavBar";
import UserWelcome from "./UserWelcome";
import Loading from "../Layout/Loading";
import UserProgressBar from "./UserProgressBar";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

/**
 * UI for the user dashboard
 */
class UserDash extends React.Component {
  state = {
    user: this.props.user,
    workshop_data: this.props.workshop_data,
    userProgress: this.props.savedProgress,
    currentPage: this.props.savedProgress - 1,
    Level_Enabled: this.props.Level_Enabled,
    dataLoaded: this.props.dataLoaded,
  };

  /**
   * Remove progress listener if the page crashes
   */
  componentWillUnmount() {
    if (this.props.progressListener) this.props.progressListener();
  }

  componentDidMount() {
    this.props.getProgressData();
  }

  // lifecycle method that is invoked anytime the component props are updated
  componentDidUpdate(prevProps) {
    console.log("inside component  update");
    if (this.props.savedProgress !== prevProps.savedProgress) {
      this.setState({
        userProgress: this.props.savedProgress,
      });
    }
    if (this.props.Level_Enabled !== prevProps.Level_Enabled) {
      this.setState({
        Level_Enabled: this.props.Level_Enabled,
      });
    }
    if (this.props.dataLoaded !== prevProps.dataLoaded) {
      this.setState({
        dataLoaded: this.props.dataLoaded,
      });
    }
  }

  // increments current level by 1. This is not their overall progress, but the stage which they are viewing.
  nextLevel = () => {
    this.setState((state) => ({
      currentPage: state.currentPage + 1,
    }));
  };

  // decrements current level by 1. This is not their overall progress, but the stage which they are viewing.
  previousLevel = () => {
    this.setState((state) => ({
      currentPage: state.currentPage - 1,
    }));
  };

  // marks current stage completed and sends data to database.
  markCompleted = () => {
    // update database on current user progress
    this.setState(
      (state) => ({
        userProgress: state.userProgress + 1,
      }),
      this.props.updateUserProgress(this.state.userProgress + 1)
    );
  };

  render() {
    let workshop_levels = this.state.workshop_data.Level_Titles.map(
      (item, index) => {
        if (this.state.currentPage === index) {
          return (
            <Col key={index}>
              <Card className="floating-icon" bg="primary">
                <Card.Header>{item}</Card.Header>
              </Card>
            </Col>
          );
        } else if (this.state.userProgress > index) {
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
      this.state
    );

    // display workshop level descriptions with HTML formatting
    let workshop_level_text = (
      <div
        dangerouslySetInnerHTML={{
          __html: this.state.workshop_data.Level_Descriptions[
            this.state.currentPage
          ],
        }}
      />
    );

    // OLD WAY OF READING TEXT, WITHOUT HTML FORMATTING
    // let workshop_level_text = this.state.workshop_data.Level_Descriptions[
    //   this.state.currentPage
    // ];

    let workshop_level_title = this.state.workshop_data.Level_Titles[
      this.state.currentPage
    ];

    var displayNext =
      (this.state.Level_Enabled > this.state.userProgress &&
        this.state.userProgress > this.state.currentPage) ||
      (this.state.Level_Enabled === this.state.userProgress &&
        this.state.currentPage < this.state.userProgress - 1);
    var displayPrevious = this.state.currentPage > 0;
    var displayMarkCompleted =
      this.state.userProgress === this.state.currentPage && !displayNext;

    if (this.state.userProgress === -1) {
      return (
        <UserWelcome
          signOut={this.props.signOut}
          Workshop_Name={this.state.workshop_data.Workshop_Name}
          user={this.state.user}
          markCompleted={this.markCompleted}
        />
      );
    }
    console.log("workshop text");
    console.log(
      this.state.workshop_data.Level_Descriptions[this.state.currentPage]
    );

    return (
      <div>
        <NavBar dashboard={true} signOut={this.props.signOut} />
        <Container fluid className="text-center p-3">
          {!this.state.dataLoaded ? (
            <Loading />
          ) : (
            <>
              <Row className="m-3 mb-5">{workshop_levels}</Row>
              <UserProgressBar
                userProgress={this.state.userProgress}
                Number_Of_Levels={this.state.workshop_data.Number_Of_Levels}
                Level_Enabled={this.state.Level_Enabled}
              />
              <Card className="mt-4 floating-icon">
                <Card.Header className="text-left p-3 mt-2">
                  {this.state.currentPage ===
                  this.state.workshop_data.Number_Of_Levels
                    ? "Workshop Complete!"
                    : workshop_level_title}
                </Card.Header>

                <Card.Body>{workshop_level_text}</Card.Body>
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
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default UserDash;
