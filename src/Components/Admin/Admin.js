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

// let setSf = db.collection('Student').doc('sivam').set({
//   Name: 'Sivam Patel', Email: 'spatel@gmail.com',
//   Password: 'Test456'
// });

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, //once authentication happens this will toggle to true
      username: "", //stores the username of person that logged in (not required)
      password: "", //stores the password of person that logged in (not required)
      id: "",
      isAdmin: null,
      loginError: false,
    };

    this.authenticate = this.authenticate.bind(this);
    this.readFromDatabase = this.readFromDatabase.bind(this);
  }

  /**
   * This function is passed as props to the AdminAuth Component which returns the username and password entered
   * Currrently just changes the loggedIn state to true without any checks
   *
   * @param {*} username is the username of the person logging in
   * @param {*} password is the password of the person logging in
   */
  authenticate(username, password) {
    let db = this.props.database;
    if (username.charAt("@") === -1 || username.charAt(".") === -1)
      return false;
    db.collection("Student")
      .where("Email", "==", username)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return false;
        } else {
          snapshot.forEach((doc) => {
            var data = doc.data();
            if (data.Password === password && data.isAdmin) {
              this.setState({
                loggedIn: true,
                username: data.Email,
                password: data.Password,
                id: data.id,
                isAdmin: true,
              });
            }
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        return false;
      });
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
          <AdminAuth authenticate={this.authenticate} />
        )}
      </div>
    );
  }
}

export default Admin;
