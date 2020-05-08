import React from "react";
import UserAuth from "./UserAuth";
import UserDash from "./UserDash";
import WorkshopLogin from "./WorkshopLogin";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, //once authentication happens this will toggle to true
      workshopID: null,
      workshop_data: null,
      Level_Enabled: 0,
      dataLoaded: false,
      Enabled: false,
      loginError: false,
    };

    this.authenticate = this.authenticate.bind(this);
    this.authenticateWorkshop = this.authenticateWorkshop.bind(this);
    this.signInWorkshop = this.signInWorkshop.bind(this);
    this.updateUserProgress = this.updateUserProgress.bind(this);
    this.getProgressData = this.getProgressData.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentWillUnmount() {
    if (this.progressListener) this.progressListener();
    this.props.database
      .auth()
      .signOut()
      .then(function () {
        console.log("auto signed out");
      })
      .catch(function (error) {
        console.log("error signing out");
      });
  }

  // contacts firestore and authenticates the user. Sets user data if user login works.
  authenticate(email, password) {
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }
    this.props.database
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState({
          loginError: true,
        });
        console.log("Invalid Email or Password");
      });
    this.props.database.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        this.setState({
          loggedIn: true,
        });
      }
    });
    return this.props.database.currentUser !== undefined;
  }

  authenticateWorkshop(workshop) {
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }
    this.props.database
      .firestore()
      .collection("Workshop")
      .doc(workshop)
      .get()
      .then((doc) => {
        if (!doc.exists){
          this.setState({
            loginError: true,
          });
        }
        else {
          this.setState(
            {
              workshop_data: doc.data(),
              workshopID: workshop,
            },
            this.getProgressData
          );
        }
      });
  }

  signInWorkshop() {
    if (this.state.Enabled) this.updateUserProgress(0);
  }

  getProgressData() {
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        this.setState({
          Level_Enabled: snapshot.data().Level_Enabled,
          Enabled: snapshot.data().Enabled,
          dataLoaded: true,
        });
      });
  }

  updateUserProgress(progress) {
    // BELOW IS CODE TO UPDATE IF PROGRESS STORES IN A MAP
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .update({
        ["testProgress." +
        this.props.database.auth().currentUser.uid]: progress,
      })
      .then(() => {
        console.log("updated");
      });
  }

  signOutUser() {
    console.log("signing Out");
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false, //once authentication happens this will toggle to true
          workshopID: null,
          workshop_data: null,
          Level_Enabled: 0,
          dataLoaded: false,
          Enabled: false,
        });
      })
      .catch((err) => {
        console.log("error signing user out");
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
