import React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import "firebase/firestore";

/** This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 * Author: Harsha Srikara
 * Date: 3/22/20
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
    this.updateWorkshop = this.updateWorkshop.bind(this);
    this.createNewWorkshop = this.createNewWorkshop.bind(this);
  }

  componentWillUnmount() {
    this.props.database
      .auth()
      .signOut()
      .then(function () {
        console.log("signed out");
      })
      .catch(function (error) {
        console.log("error signing out");
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
    this.props.database
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log("Invalid Email or Password");
        return;
      });
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
            if (doc.data().isAdmin === true) {
              this.readWorkshopData();
              this.setState({
                loggedIn: true,
              });
            } else {
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

  readWorkshopData() {
    this.props.database
      .firestore()
      .collection("Workshop")
      .get()
      .then((snapshot) => {
        var arr = [];
        snapshot.forEach((snap) => {
          arr.push(snap.data());
        });
        console.log(arr);

        this.setState(
          {
            workshop_data: arr,
          },
          this.readStudentData //callback function that will execute after the workshop data has been saved in the state
        );
      });
  }

  readStudentData() {
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .onSnapshot((snapshot) => {
        var arr = [];
        snapshot.forEach((snap) => {
          arr.push(snap.data());
        });
        console.log(arr);

        this.setState({
          student_data: arr,
          dataLoaded: true,
          //removeListener: removeListener
        });
      });
  }

  updateWorkshopLevel(workshopID, level) {
    console.log("setting admin level for workshop: " + workshopID + " = " + level);
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

  updateWorkshopStatus(workshopID, status) {
    console.log("updating status");
    console.log(this.state.student_data.Enabled);
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

  updateWorkshop(workshopID, workshopObject) {
    console.log("updating all fields in studentsAtWorkshop collection");

    // I think the date field in the workshop object needs some changing for it to work

    this.props.database.firestore().collection("Workshop").doc(workshopID).update({
      Date: workshopObject.Date,
      Level_Descriptions: workshopObject.Level_Descriptions,
      Level_Titles: workshopObject.Level_Titles,
      Number_Of_Levels: workshopObject.Number_Of_Levels,
      Workshop_Name: workshopObject.Workshop_Name,
      Workshop_ID: workshopObject.Workshop_ID,
    }).then(() => {
      console.log("update complete");
    });
  }

  createNewWorkshop(workshopObject) {
    this.props.database.firestore().collection("Workshop").doc(workshopObject.workshop_ID).set(workshopObject).then(() => {
      console.log("new workshop created");
    });

    let tempStudentWorkshop = {
      Workshop_ID: workshopObject.Workshop_ID,
      Enabled: false,
      Level_Enabled: 0,
      Students: [],
      Progress: [],
    };
    this.props.database.firestore().collection("StudentsAtWorkshop").doc(workshopObject.workshop_ID).set(tempStudentWorkshop).then(() => {
      console.log("empty students at workshop entry created")
    })
  }

  deleteWorkshop(workshopID) {
    console.log("deleting workshop from both Workshop and StudentAtWorkshop collection");

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

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn && this.state.dataLoaded ? (
          <AdminDashboard
            workshop_data={this.state.workshop_data}
            student_data={this.state.student_data}
            updateWorkshop={this.updateWorkshop}
            updateLevel={this.updateWorkshopLevel}
            createWorkshop={this.createNewWorkshop}
            deleteWorkshop={this.deleteWorkshop}
            updateStatus={this.updateWorkshopStatus}
          />
        ) : (
          <AdminAuth
            authenticate={this.authenticate}
            loginError={this.props.loginError}
          />
        )}
      </div>
    );
  }
}

export default Admin;
