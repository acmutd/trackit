import * as React from "react";
import NavBar from "../Layout/NavBar";
import UserWelcome from "./UserWelcome";
import Loading from "../Layout/Loading";
import UserProgressBar from "./UserProgressBar";
import { Row, Col, Card, Button, Container, Alert } from "react-bootstrap";
import { workshop } from "../Config/interface"


interface DashProps {
  workshop_data: workshop,
  getProgressData(): void,
  updateUserProgress: Function,
  progressListener: firebase.Unsubscribe | undefined, //undefined in the event that 
  Level_Enabled: number,
  signOut(): void,
  savedProgress: number,
  dataLoaded: boolean,
  user: string,
  alert: boolean,
  alertText: string,
  resetAlertStatus(): void
}

interface DashState {
  user: string,
  workshop_data: workshop,
  userProgress: number,
  currentPage: number,
  Level_Enabled: number,
  dataLoaded: boolean,
  alert: boolean,
  alertText: string
}

/**
 * UI for the user dashboard
 */
class UserDash extends React.Component<DashProps, DashState> {
  state: DashState = {
    user: this.props.user,
    workshop_data: this.props.workshop_data,
    userProgress: this.props.savedProgress,
    currentPage: this.props.savedProgress - 1,
    Level_Enabled: this.props.Level_Enabled,
    dataLoaded: this.props.dataLoaded,
    alert: false,
    alertText: "Unknown error occurred",
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
  componentDidUpdate(prevProps: DashProps) {
    if (this.props.savedProgress !== prevProps.savedProgress) {
      this.setState({
        userProgress: this.props.savedProgress,
        currentPage: this.props.savedProgress - 1,
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
    if (this.props.alert !== prevProps.alert) {
      this.setState({
        alert: this.props.alert,
        alertText: this.props.alertText,
      })
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
      (item: string, index: number) => {
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

    return (
      <div>
        <NavBar dashboard={true} signOut={this.props.signOut} />
        <Container fluid className="text-center p-3">
          {this.state.alert ? (
            <div className="m-1 mt-3">
              <Alert
                variant="danger"
                onClose={() => this.props.resetAlertStatus()}
                dismissible
              >
                {this.state.alertText}
              </Alert>
            </div>
          ) : (
            ""
          )}
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
