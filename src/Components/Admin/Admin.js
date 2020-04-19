import React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import firebase from 'firebase';
import 'firebase/firestore';


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
      loginError: false
    };

    this.authenticate = this.authenticate.bind(this);
    this.readFromDatabase = this.readFromDatabase.bind(this);
  }

  componentWillUnmount()
  {
    this.props.database.auth.signOut();
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
                this.setState({
                  loggedIn: true
                })
              }
              else 
              {
                
                // logout non Admin user
                this.props.database.auth().signOut().then(() =>
                {
                  console.log('successfully logged ou t non admin ')
                }).catch(err => 
                  {
                    console.log("error logging out non admin user")
                  })
              }
            })
        }
      })
  }

  readFromDatabase() {
    //read data from database and store it in this.state
    //eventually pass in the data to AdminDashboard as props
  }

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          <AdminDashboard />
        ) : (
          <AdminAuth authenticate={this.authenticate} loginError = {this.props.loginError}/>
        )}
      </div>
    );
  }
}

export default Admin;
