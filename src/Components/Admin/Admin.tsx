import * as React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import {
  user,
  workshop,
  studentsAtWorkshopFirebase,
  workshopFirebase,
  studentsAtWorkshop,
} from "../Firebase/interface";

interface AdminProps {
  database: firebase.app.App;
}

interface AdminState {
  loggedIn: boolean;
  loginError: boolean;
  workshop_data: workshop[];
  student_data: studentsAtWorkshop[];
  dataLoaded: boolean;
  alert: boolean;
  alertText: string;
}

/**
 * This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 */
class Admin extends React.Component<AdminProps, AdminState> {
  state: AdminState = {
    loggedIn: false, //once authentication happens this will toggle to true
    loginError: false,
    workshop_data: [],
    student_data: [],
    dataLoaded: false,
    alert: false,
    alertText: "Unknown error occured",
  };
  progressListener: firebase.Unsubscribe | any; //find a way to get rid of any
  workshopListener: firebase.Unsubscribe | any;
  loginListener: firebase.Unsubscribe | any;

  /**
   * If the page crashes then the user gets automatically logged out
   */
  componentWillUnmount() {
    if (this.progressListener) this.progressListener();
    if (this.workshopListener) this.workshopListener();
    if (this.loginListener) this.loginListener();
  }

  componentDidMount() {
    this.loginListener = this.props.database
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        // user is signed in
        if (user) {
          // get user data from Students collection to check if they are an admin
          this.props.database
            .firestore()
            .collection("Student")
            .doc(user.uid)
            .get()
            .then((doc: user) => {
              // if the user has admin acess then set loggedIn to true
              if (doc.data()?.isAdmin === true) {
                this.setState({
                  loggedIn: true,
                });
              } else {
                this.setState({
                  loginError: true,
                });
                // if the user had a valid login but was not an admin log them out
                this.props.database
                  .auth()
                  .signOut()
                  .then(() => {
                    console.log("successfully logged out non admin");
                  })
                  .catch((error) => {
                    console.log(error + " error logging out non admin user");
                  });
              }
            })
            .catch((error) => {
              this.setState({
                alert: true,
                alertText: error + " Error occurred in login process",
              });
              console.log(error + " error occurred in login process");
            });
        }
      });
  }

  /**
   * This function is passed as props to the <AdminAuth /> Component which returns the username and password entered
   * Signs in the user through firebase authentication
   *
   * @param {string} username is the username of the person logging in
   * @param {string} password is the password of the person logging in
   */
  authenticate = (username: string, password: string) => {
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }
    this.props.database
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((error) => {
        this.setState({
          loginError: true,
        });
        console.log(error + " Invalid Email or Password");
      });
  };

  /**
   * Read workshop data from Workshops collection on firestore
   * Sets listener to see if any updates are being made
   * Calls readStudentData once it has finished reading the workshop data
   */
  readWorkshopData = () => {
    //set listener for updates
    this.workshopListener = this.props.database
      .firestore()
      .collection("Workshop")
      .onSnapshot((snapshot) => {
        let arr: workshop[] = [];
        //save each workshop into an array
        snapshot.forEach((snap: workshopFirebase) => {
          let workshopObject = {
            Date: snap.data()?.Date,
            Level_Descriptions: snap.data()?.Level_Descriptions,
            Level_Titles: snap.data()?.Level_Titles,
            Number_Of_Levels: snap.data()?.Number_Of_Levels,
            Workshop_ID: snap.data()?.Workshop_ID,
            Workshop_Name: snap.data()?.Workshop_Name,
          };
          arr.push(workshopObject);
        });
        //save array in state
        this.setState({
          workshop_data: arr,
        });
      });
  };

  /**
   * Reads Student progress information from StudentsAtWorkshop collection on firestore
   * Sets listener to monitor for updates
   */
  readStudentData = () => {
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .onSnapshot(
        (
          snapshot: firebase.firestore.QuerySnapshot<
            firebase.firestore.DocumentData
          >
        ) => {
          let arr: studentsAtWorkshop[] = [];
          snapshot.forEach((snap: studentsAtWorkshopFirebase) => {
            //split map into two parallel arrays for easy use in front-end
            let students = [];
            let progress = [];
            for (var x in snap.data().testProgress) {
              var user = decodeURIComponent(x).replace("%2E", ".");
              students.push(user);
              progress.push(snap.data().testProgress[x]);
            }

            let studentsObject: studentsAtWorkshop = {
              Students: students,
              Progress: progress,
              Enabled: snap.data().Enabled,
              Workshop_ID: snap.data().Workshop_ID,
              Level_Enabled: snap.data().Level_Enabled,
            };
            arr.push(studentsObject);
          });

          //save data in state
          this.setState({
            student_data: arr,
            dataLoaded: true,
          });
        }
      );
  };

  /**
   * If workshop level gets incremented or decremented this function gets called to update Level_Enabled on firestore
   * @param {string} workshopID
   * @param {number} level
   */
  updateWorkshopLevel = (workshopID: string, level: number) => {
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Level_Enabled: level,
      })
      .then(() => {
        console.log("workshop level successfully updated");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop level",
        });
        console.log(error + " error occurred in updating workshop level");
      });
  };

  /**
   * If workshop gets toggled between Enabled/Disabled this function gets called to update in firestore
   * @param {string} workshopID
   * @param {number} status
   */
  updateWorkshopStatus = (workshopID: string, status: boolean) => {
    console.log("updating status");
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Enabled: status,
      })
      .then(() => {
        console.log("workshop status successfully updated");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop status",
        });
        console.log(error + " error occurred in updating workshop status");
      });
  };

  /**
   * map<student, progress> on firestore gets cleared when this function gets called
   * All students signed in for a given workshop have their progress erased and removed
   * @param {string} workshopID
   */
  clearStudentsAtWorkshop = (workshopID: string) => {
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        testProgress: {},
      })
      .then(() => {
        console.log("All student progress successfully cleared");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in erasing student progress",
        });
        console.log(error + " error occured in erasing student progress");
      });
  };

  /**
   * When a workshop gets updated, all fields saved on firestore get overwritten by the new edits
   * @param {*} workshopID
   * @param {*} workshopObject
   */
  updateWorkshop = (workshopID: string, workshopObject: workshop) => {
    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshopID)
      .set({
        Date: workshopObject.Date,
        Level_Descriptions: workshopObject.Level_Descriptions,
        Level_Titles: workshopObject.Level_Titles,
        Number_Of_Levels: workshopObject.Number_Of_Levels,
        Workshop_Name: workshopObject.Workshop_Name,
        Workshop_ID: workshopObject.Workshop_ID,
      })
      .then(() => {
        console.log("updating workshop successful");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop",
        });
        console.log(error + " error occurred in updating workshop");
      });

    // when a workshop gets updated, its progress gets reset to 1
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Level_Enabled: 1,
      })
      .then(() => {
        console.log("workshop level successfully reset to 1");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in reseting workshop level to 1",
        });
        console.log(error + " error occurred in reseting workshop level to 1");
      });
  };

  /**
   * creates a new workshop in Workshop collection on firestore
   * Should fail if a workshop already exists with the same name
   * @param {*} workshopObject
   */
  createNewWorkshop = (workshopObject: workshop) => {
    //creates a blank object for the number of students in a workshop
    //this happens first to avoid issues due to the async nature of the JS listener
    let tempStudentWorkshop = {
      Workshop_ID: workshopObject.Workshop_ID,
      Enabled: false,
      Level_Enabled: 1,
      testProgress: {},
    };
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopObject.Workshop_ID)
      .set(tempStudentWorkshop)
      .then(() => {
        console.log("empty students at workshop entry created");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText:
            error +
            " Error occurred in adding empty students at workshop object",
        });
        console.log(
          error + " error occured in adding empty sudents at workshop object"
        );
      });

    //creates the new workshop here
    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshopObject.Workshop_ID)
      .set(workshopObject)
      .then(() => {
        console.log("new workshop created");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in creating new workshop",
        });
        console.log(error + " error occurred in creating new workshop");
      });
  };

  /**
   * deletes a workshop from both the workshop and the studentsAtworkshop collection
   * @param {string} workshopID
   */
  deleteWorkshop = (workshopID: string) => {
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("successfully deleted students at workshop");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in deleting students at workshop",
        });
        console.log(error + " error occurred in deleting students at workshop");
      });

    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("successfully deleted workshop");
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in deleting workshop",
        });
        console.log(error + " error occurred in deleting workshop");
      });
  };

  /**
   * signs out the user
   */
  signOutUser = () => {
    console.log("signing out");
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false,
          loginError: false,
          workshop_data: [],
          student_data: [],
          dataLoaded: false,
        });
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in signing out the user",
        });
        console.log(error + " error signing user out");
      });
  };

  /**
   * Reset the alert status once it has been closed
   */
  resetAlertStatus = () => {
    this.setState({
      alert: false,
      alertText: "Unknown error occurred",
    });
  };

  /**
   * Check whether the arrays are not empty meaning they have been filled in with information from firebase
   */
  isDataLoaded = () => {
    if(this.state.workshop_data.length > 0 && this.state.student_data.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * renders the page
   */
  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          <AdminDashboard
            workshop_data={this.state.workshop_data}
            student_data={this.state.student_data}
            readStudentData={this.readStudentData}
            readWorkshopData={this.readWorkshopData}
            updateWorkshop={this.updateWorkshop}
            updateLevel={this.updateWorkshopLevel}
            createWorkshop={this.createNewWorkshop}
            deleteWorkshop={this.deleteWorkshop}
            updateStatus={this.updateWorkshopStatus}
            clearWorkshop={this.clearStudentsAtWorkshop}
            progressListener={this.progressListener}
            workshopListener={this.workshopListener}
            signOut={this.signOutUser}
            dataLoaded={this.isDataLoaded()} //executes function call, does not pass in function
            alert={this.state.alert}
            alertText={this.state.alertText}
            resetAlertStatus={this.resetAlertStatus}
          />
        ) : (
          <AdminAuth
            authenticate={this.authenticate}
            loginError={this.state.loginError}
          />
        )}
      </div>
    );
  }
}

export default Admin;
