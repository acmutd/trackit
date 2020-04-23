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
  }

  componentWillUnmount()
  {
    if(this.progressListener)
      this.progressListener();
    this.props.database.auth().signOut().then(function() {
      console.log("signed out")
    }).catch(function(error) {
      console.log("error signing out")
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
    this.props.database.auth().signInWithEmailAndPassword(username, password).catch(err =>
      {
        console.log("Invalid Email or Password")
        return;
      })  
    this.props.database.auth().onAuthStateChanged(user =>
      {
        // user is signed in
        if(user) 
        {
          // get user data from Students collection to check if they are an admin
          this.props.database.firestore().collection('Student').doc(user.uid).get().then(doc =>
            {
              // login user, allow to admin dashboard if admin
              if(doc.data().isAdmin === true)
              {
                this.readWorkshopData();
                this.setState({
                  loggedIn: true
                })
              }
              else 
              {
                
                // logout non Admin user
                this.props.database.auth().signOut().then(() =>
                {
                  console.log('successfully logged out non admin ')
                }).catch(err => 
                  {
                    console.log("error logging out non admin user")
                  })
              }
            })
        }
      })
  }

  readWorkshopData() 
  {
    this.props.database.firestore().collection('Workshop')
          .get().then(snapshot =>
          {
            var arr = [];
            snapshot.forEach(snap =>
              {
                arr.push(snap.data())
              })
              console.log(arr)

              this.setState({
                  workshop_data: arr
              }, this.readStudentData)
          })
  }

  readStudentData()
  {
    this.progressListener = this.props.database.firestore().collection('StudentsAtWorkshop')
          .onSnapshot(snapshot =>
          {
            var arr = [];
            snapshot.forEach(snap =>
              {
                arr.push(snap.data())
              })
              console.log(arr)

              this.setState({
                  student_data: arr,
                  dataLoaded: true
                  //removeListener: removeListener
              })
          })
  }

  updateWorkshopLevel(level, workshopID)
  {
    console.log("updating data for: " + level + " " + workshopID)
    this.props.database.firestore().collection('StudentsAtWorkshop').doc(workshopID).update({
      Level_Enabled: level
    }).then(() => {
      console.log("updated")
    })
  }

  updateWorkshopStatus(workshopID, status)
  {
    console.log("updating status")
    console.log(this.state.student_data.Enabled)
    this.props.database.firestore().collection('StudentsAtWorkshop').doc(workshopID).update({
      Enabled: status
    }).then(() => {
      console.log("updated")
    })
  }

  deleteWorkshop(workshopID)
  {
    // to delete or not delete in workshops collection, that is the question
    console.log('deleting workshop')
    this.props.database.firestore().collection('StudentsAtWorkshop').doc(workshopID).delete().then(() => {
      console.log("deleted students at workshop")
    })
  }

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {(this.state.loggedIn && this.state.dataLoaded) ? (
          <AdminDashboard workshop_data = {this.state.workshop_data} updateLevel = {this.updateWorkshopLevel} 
          student_data = {this.state.student_data} updateStatus = {this.updateWorkshopStatus} progressListener = {this.progressListener} />
        ) : (
          <AdminAuth authenticate={this.authenticate} loginError = {this.props.loginError} />
        )}
      </div>
    );
  }
}

export default Admin;
