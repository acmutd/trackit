import React from "react";
import UserAuth from "./UserAuth";
import UserDash from "./UserDash";
import WorkshopLogin from "./WorkshopLogin";

class User extends React.Component {
  state = {
    loggedIn: false, //once authentication happens this will toggle to true
    workshopID: null,
    workshop_data: null,
    Level_Enabled: 0,
    dataLoaded: false,
    Enabled: false,
    loginError: false,
    initialProgress: 0,
  };

  /**
   * Sign out the user if the page crashes or components gets unmounted
   */
  componentWillUnmount() {
    //remove progress listener
    if (this.progressListener) this.progressListener();
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out occurred on page unmount");
      })
      .catch((error) => {
        console.log(error + "sign out failed on page unmount");
      });
  }

  /**
   * Contacts firestore and authenticates the user
   * Sets user data if user login works
   * @param {*} email
   * @param {*} password
   */
  authenticate = (email, password) => {
    //resets the state of login error to be false
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }

    //attempts to authenticate the user
    this.props.database
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({
          loginError: true,
        });
        console.log(err + " Invalid Email or Password");
      });

    //listener to check if the user got successfully signed in
    this.props.database.auth().onAuthStateChanged(user => {
      if (user) {
        // user is signed in
        this.setState({
          loggedIn: true,
        });
      }
    });
  }

  /**
   * Once the user is signed in they will enter the workshop_ID
   * This will validate that said workshop exists, is enabled and if so will open up the user dashboard
   * @param {*} workshop 
   */
  authenticateWorkshop = (workshop) => {
    //reset the login error if any occurred during authentication
    //same variable gets reused to see if any errors happen in authenticating the workshop name
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }

    //read the workshop data if present else trigger a alert
    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshop)
      .get()
      .then(doc => {
        if (!doc.exists) {
          this.setState({
            loginError: true,
          });
        } else {
          this.setState(
            {
              workshop_data: doc.data(),
              workshopID: workshop,
            },
            this.getProgressData //call back function to read progress information
          );
        }
      }).catch(error => {
        console.log(error + " error occurred in reading back workshop information");
      });
  }

  /**
   * Read back how much progress the student had previously completed
   * Also check to see if the workshop is enabled or not
   */
  getProgressData = () => {
    //splices the email to get just the part before the @ sign
    let email = this.props.database
      .auth()
      .currentUser.email.substring(
        0,
        this.props.database.auth().currentUser.email.lastIndexOf("@")
      );
    
    //sets a progress listener on the collection to monitor for when the Level_Enabled or Enabled variables change state
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .onSnapshot(snapshot => {
        this.setState(
          {
            Level_Enabled: snapshot.data().Level_Enabled,
            Enabled: snapshot.data().Enabled,
            initialProgress: snapshot.data().testProgress[email], //will either be the actual number or undefined
            dataLoaded: true,
          },
          //callback function
          function () { 
            if (
              this.state.initialProgress === undefined ||
              this.state.initialProgress === null
            ) {
              this.setState({
                initialProgress: 0, //if the user is logging in the first time
              });
            }
          }
        );
      });
  }

  //update the student progress in firestore if the user clicks mark completed for a given level
  updateUserProgress = (progress) => {
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .update({
        ["testProgress." +
        this.props.database
          .auth()
          //splices the email to be just stuff before the @ sign
          .currentUser.email.substring(
            0,
            this.props.database.auth().currentUser.email.lastIndexOf("@")
          )]: progress,
      })
      .then(() => {
        console.log("user progress updated");
      }).catch(error => {
        console.log(error + "error occurred in updating user progress");
      });
  }

  /**
   * Sign out the user when they click sign out
   */
  signOutUser = () => {
    console.log("signing Out");
    this.props.database
      .auth()
      .signOut()
      .then(() => { //reset the state
        this.setState({
          loggedIn: false,
          workshopID: null,
          workshop_data: null,
          Level_Enabled: 0,
          dataLoaded: false,
          Enabled: false,
        });
      })
      .catch(error => {
        console.log(error + " error signing user out");
      });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          this.state.dataLoaded === false ? (
            <WorkshopLogin
              authenticate={this.authenticateWorkshop}
              loginError={this.state.loginError}
            />
          ) : (
            <UserDash
              workshop_data={this.state.workshop_data}
              updateUserProgress={this.updateUserProgress}
              progressListener={this.progressListener}
              Level_Enabled={this.state.Level_Enabled}
              signOut={this.signOutUser}
              savedProgress={this.state.initialProgress}
            />
          )
        ) : (
          <UserAuth
            authenticate={this.authenticate}
            loginError={this.state.loginError}
          />
        )}
      </div>
    );
  }
}

export default User;
