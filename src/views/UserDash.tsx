import * as React from "react";
import NavBar from "../components/Layout/NavBar";
import UserWelcome from "../components/User/UserWelcome";
import Loading from "../components/Layout/Loading";
import UserProgressBar from "../components/User/UserProgressBar";
import { Row, Col, Card, Button, Container, Alert } from "react-bootstrap";
import { workshop, studentsAtWorkshopFirebase } from "../config/interface";
import { connect } from "react-redux";
import Spinner from "../components/Layout/Loading";
import app from "../config/firebase";

interface DashProps {
  user: string;
  workshopID?: string;
  workshop_data?: workshop;
}

interface DashState {
  userProgress: number;
  currentPage: number;
  Level_Enabled: number;
  dataLoaded: boolean;
  alert: boolean;
  alertText: string;
}

/**
 * UI for the user dashboard
 */
class UserDash extends React.Component<DashProps, DashState> {
  state: DashState = {
    userProgress: -5,
    currentPage: -5,
    Level_Enabled: -5,
    dataLoaded: false,
    alert: false,
    alertText: "Unknown error occurred",
  };

  progressListener?: firebase.Unsubscribe;

  /**
   * Remove progress listener if the page crashes
   */
  componentWillUnmount() {
    if (this.progressListener) this.progressListener();
  }

  componentDidMount() {
    this.getProgressData();
  }

  getProgressData = () => {
    // //convert .,@ and other weird symbols in emails to be of a proper format
    let email: string = encodeURIComponent(this.props.user).replace(
      /\./g,
      "%2E"
    );

    //set listener on firestore
    this.progressListener = app
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.props.workshopID)
      .onSnapshot(
        (
          snapshot:
            | studentsAtWorkshopFirebase
            | firebase.firestore.DocumentSnapshot<
                firebase.firestore.DocumentData
              >
        ) => {
          //query snapshot too strict of a definition, firebase does not verify if data is present
          if (snapshot !== undefined) {
            this.setState({
              Level_Enabled: snapshot.data()?.Level_Enabled,
              // Enabled: snapshot.data()?.Enabled,
            });
            if (snapshot.data()?.testProgress[email] !== undefined) {
              //console.log('progress is true')
              //if the user is logging back onto a workshop
              this.setState(
                {
                  userProgress: snapshot.data()?.testProgress[email],
                },
                this.isDataLoaded
              );
            } else {
              //console.log('progress is false')

              //if a user is logging onto a workshop for the first time
              this.setState(
                {
                  userProgress: -1,
                },
                this.isDataLoaded
              );
            }
          }
        }
      );
  };

  /**
   * Update the progress in firestore for a given student when they click markCompleted in the UI
   * @param {number} progress
   */
  updateUserProgress = (progress: number) => {
    let result: string = encodeURIComponent(this.props.user).replace(
      /\./g,
      "%2E"
    );

    app
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.props.workshopID)
      .update({
        ["testProgress." + result]: progress,
      })
      .then(() => {
        //user progress updated
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating user progress",
        });
        console.log({
          error: error,
          message: "Error occurred in updating student progress",
        });
      });
  };

  isDataLoaded = () => {
    if (!this.state.dataLoaded) {
      if (this.props.workshop_data !== null && this.state.userProgress !== -5) {
        console.log("setting data to true");
        if(this.state.Level_Enabled === this.state.userProgress)
        {
          this.setState((state) => ({
            currentPage: state.userProgress - 1,
            dataLoaded: true,
          }))
        }
        else
        {
          this.setState((state) => ({
            currentPage: state.userProgress,
            dataLoaded: true,
          }));
        }
      }
    }
  };

  resetAlertStatus = () => {
    this.setState({
      alert: false,
      alertText: "Unknown error occurred",
    });
  };

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
      () => this.updateUserProgress(this.state.userProgress)
    );
  };

  welcomeDashWrapper = () => 
  {
    this.nextLevel();
    this.markCompleted();
  }

  render() {
    if (this.props.workshop_data === undefined) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    let workshop_levels = this.props.workshop_data?.Level_Titles.map(
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
          __html: this.props.workshop_data.Level_Descriptions[
            this.state.currentPage
          ],
        }}
      />
    );

    let workshop_level_title = this.props.workshop_data.Level_Titles[
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
          Workshop_Name={this.props.workshop_data.Workshop_Name}
          user={this.props.user}
          markCompleted={this.welcomeDashWrapper}
        />
      );
    }

    return (
      <div>
        <NavBar />
        <Container fluid className="text-center p-3">
          {this.state.alert ? (
            <div className="m-1 mt-3">
              <Alert
                variant="danger"
                onClose={() => this.resetAlertStatus()}
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
                Number_Of_Levels={this.props.workshop_data.Number_Of_Levels}
                Level_Enabled={this.state.Level_Enabled}
              />
              <Card className="mt-4 floating-icon">
                <Card.Header className="text-left p-3 mt-2">
                  {this.state.currentPage ===
                  this.props.workshop_data.Number_Of_Levels
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

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const mapStateToProps = (state: any) => {
  return {
    workshopID: state.userReducer.workshopID,
    workshop_data: state.userReducer.workshop_data,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDash);
