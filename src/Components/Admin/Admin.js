import React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";

/** This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 */

// Initialize Firebase

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, //once authentication happens this will toggle to true
      loginError: false,
      workshop_data: null,
      student_data: null,
      dataLoaded: false,
    };

    this.authenticate = this.authenticate.bind(this);
    this.readStudentData = this.readStudentData.bind(this);
    this.readWorkshopData = this.readWorkshopData.bind(this);
    this.updateWorkshopLevel = this.updateWorkshopLevel.bind(this);
    this.readStudentData = this.readStudentData.bind(this);
    this.updateWorkshopStatus = this.updateWorkshopStatus.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    this.updateWorkshop = this.updateWorkshop.bind(this);
    this.createNewWorkshop = this.createNewWorkshop.bind(this);
    this.clearStudentsAtWorkshop = this.clearStudentsAtWorkshop.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);
  }

  /**
   * If the page crashes then the user gets automatically logged out
   */
  componentWillUnmount() {
    if (this.progressListener) this.progressListener();
    if (this.workshopListener) this.workshopListener();
  }

  componentDidMount()
  {
    this.props.database.auth().onAuthStateChanged((user) => {
      // user is signed in
      if (user) {
        // get user data from Students collection to check if they are an admin
        this.props.database
          .firestore()
          .collection("Student")
          .doc(user.uid)
          .get()
          .then((doc) => {
            // login user, allow to admin dashboard if admin
            console.log(doc.data() + ' datat from isADmin');
            if (doc.data().isAdmin === true) {
              console.log('logging user in')
              this.setState({
                loggedIn: true,
              }); 
            } else {
              this.setState({
                loginError: true,
              });
              // logout non Admin user
              this.props.database
                .auth()
                .signOut()
                .then(() => {
                  console.log("successfully logged out non admin ");
                })
                .catch((err) => {
                  console.log("error logging out non admin user");
                });
            }
          });
      }
    });
  }

  /**
   * This function is passed as props to the AdminAuth Component which returns the username and password entered
   * Currrently just changes the loggedIn state to true without any checks
   *
   * @param {*} username is the username of the person logging in
   * @param {*} password is the password of the person logging in
   */
  authenticate(username, password) {
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }
    this.props.database
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        this.setState({
          loginError: true,
        });
        console.log("Invalid Email or Password");
      });
  }

  /**
   * Read workshop data and set listener to see if any updates are being made
   * Calls readStudentData(); once it has finished reading the workshop data
   */
  readWorkshopData() {
    this.workshopListener = this.props.database
      .firestore()
      .collection("Workshop")
      .onSnapshot((snapshot) => {
        var arr = [];
        snapshot.forEach((snap) => {
          arr.push(snap.data());
        });
        console.log("new information")
        console.log(arr);

        this.setState({
            workshop_data: arr,
          });
      });
  }

  /**
   * Read student data and set listener to see if any updates are being made
   */
  readStudentData() {
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .onSnapshot((snapshot) => {
        var arr = [];
        snapshot.forEach((snap) => {
          var students = [];
          var progress = [];
          for (var x in snap.data().testProgress) {
            students.push(x);
            progress.push(snap.data().testProgress[x]);
          }
          var temp = {};
          temp.Students = students;
          temp.Progress = progress;
          temp.Enabled = snap.data().Enabled;
          temp.Workshop_ID = snap.data().Workshop_ID;
          temp.Level_Enabled = snap.data().Level_Enabled;
          arr.push(temp);
          console.log(temp);
        });
        console.log(arr);

        this.setState({
          student_data: arr,
          dataLoaded: true,
        });
      }); 
  }

  /**
   * updates the workshop level in the db
   * @param {*} workshopID
   * @param {*} level
   */
  updateWorkshopLevel(workshopID, level) {
    console.log(
      "setting admin level for workshop: " + workshopID + " = " + level
    );
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Level_Enabled: level,
      })
      .then(() => {
        console.log("updated");
      });
  }

  /**
   *
   * @param {*} workshopID
   * @param {*} status
   */
  updateWorkshopStatus(workshopID, status) {
    console.log("updating status");
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Enabled: status,
      })
      .then(() => {
        console.log("updated");
      });
  }

  /**
   * clears the map containing student username and progress
   * @param {*} workshopID
   */
  clearStudentsAtWorkshop(workshopID) {
    console.log("remove all students from workshop");
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        testProgress: {},
      })
      .then(() => {
        console.log("cleared all students");
      });
  }

  /**
   * updates all fields in a workshop by overwriting them
   * @param {*} workshopID
   * @param {*} workshopObject
   */
  updateWorkshop(workshopID, workshopObject) {
    console.log("updating all fields in workshop collection");
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
        console.log("update complete");
      });

    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .update({
        Level_Enabled: 1,
      })
      .then(() => {
        console.log("reset level enabled for workshop to be 1");
      });
  }

  /**
   * creates a new workshop, should fail if a workshop already exists with the same name
   * @param {*} workshopObject
   */
  createNewWorkshop(workshopObject) {

    console.log("creating new workshop");
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
      });

    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshopObject.Workshop_ID)
      .set(workshopObject)
      .then(() => {
        console.log("new workshop created");
      });
  }

  /**
   * deletes a workshop from both the workshop and the studentsAtworkshop collection
   * @param {*} workshopID
   */
  deleteWorkshop(workshopID) {
    console.log(
      "deleting workshop from both Workshop and StudentAtWorkshop collection"
    );

    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("deleted students at workshop");
      });

    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("deleted workshop");
      });
  }

  /**
   * signs out the user
   */
  signOutUser() {
    console.log("signing Out");
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false,
          loginError: false,
          workshop_data: null,
          student_data: null,
          dataLoaded: false
        });
      })
      .catch((err) => {
        console.log("error signing user out");
      });
  }

  /**
   * renders the page
   */
  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn  ? (
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
            dataLoaded = {this.state.workshop_data && this.state.student_data}
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
