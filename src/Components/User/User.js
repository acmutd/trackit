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
    if (this.loginListener) this.loginListener();
  }

  componentDidMount() {
    this.loginListener = this.props.database
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          console.log("logging in user");
          // user is signed in
          this.setState({
            loggedIn: true,
          });
        } else {
          this.setState({
            loggedIn: false,
          });
        }
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
      .catch((err) => {
        this.setState({
          loginError: true,
        });
        console.log(err + " Invalid Email or Password");
      });
  };

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
      .then((doc) => {
        if (!doc.exists) {
          this.setState({
            loginError: true,
          });
        } else {
          this.setState({
            workshop_data: doc.data(),
            workshopID: workshop,
          });
        }
      })
      .catch((error) => {
        console.log(
          error + " error occurred in reading back workshop information"
        );
      });
  };

  signInWorkshop = () => {
    if (this.state.Enabled) this.updateUserProgress(0);
  };

  /**
   * Read the progress of the current student from the StudentsAtWorkshop collection on firestore
   * Additionally read whether a workshop is enabled or not and the progress of the admin
   */
  getProgressData = () => {
    //convert .,@ and other weird symbols in emails to be of a proper format
    let email = encodeURIComponent(
      this.props.database.auth().currentUser.email
    ).replace(/\./g, "%2E");

    //set listener on firestore
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .onSnapshot((snapshot) => {
        console.log("new values from listener");
        console.log(snapshot.data().testProgress[email]);
        this.setState({
          Level_Enabled: snapshot.data().Level_Enabled,
          Enabled: snapshot.data().Enabled,
        });
        if (snapshot.data().testProgress[email]) {
          //if the user is logging back onto a workshop
          this.setState({
            initialProgress: snapshot.data().testProgress[email],
            dataLoaded: true,
          });
        } else {
          //if a user is logging onto a workshop for the first time
          this.setState({
            initialProgress: -1,
            dataLoaded: true,
          });
        }
      });
  };

  /**
   * Update the progress in firestore for a given student when they click markCompleted in the UI
   * @param {*} progress
   */
  updateUserProgress = (progress) => {
    var result = encodeURIComponent(
      this.props.database.auth().currentUser.email
    ).replace(/\./g, "%2E");
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .update({
        ["testProgress." + result]: progress,
      })
      .then(() => {
        console.log("user progress updated");
      })
      .catch((error) => {
        console.log(error + "error occurred in updating user progress");
      });
  };

  /**
   * Sign out the user when they click sign out
   */
  signOutUser = () => {
    console.log("signing Out");
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        //reset the state
        this.setState({
          loggedIn: false,
          workshopID: null,
          workshop_data: null,
          Level_Enabled: 0,
          dataLoaded: false,
          Enabled: false,
        });
      })
      .catch((error) => {
        console.log(error + " error signing user out");
      });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          !this.state.workshop_data ? (
            <WorkshopLogin
              authenticate={this.authenticateWorkshop}
              loginError={this.state.loginError}
            />
          ) : (
            <UserDash
              workshop_data={this.state.workshop_data}
              getProgressData={this.getProgressData}
              updateUserProgress={this.updateUserProgress}
              progressListener={this.progressListener}
              Level_Enabled={this.state.Level_Enabled}
              signOut={this.signOutUser}
              savedProgress={this.state.initialProgress}
              dataLoaded={this.state.dataLoaded}
              user={this.props.database.auth().currentUser.email.substring(
                0,
                this.props.database.auth().currentUser.email.lastIndexOf("@")
              )}
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
