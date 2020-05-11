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
      initialProgress: 0,
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
    if (this.loginListener) this.loginListener();
  }

  componentDidMount()
  {
    this.loginListener = this.props.database.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logging in user')
        // user is signed in
        this.setState({
          loggedIn: true,
        });
      }
      else
      {
        this.setState({
          loggedIn: false
        })
      }
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
        if (!doc.exists) {
          this.setState({
            loginError: true,
          });
        } else {
          this.setState(
            {
              workshop_data: doc.data(),
              workshopID: workshop,
            }
          );
        }
      });
  }

  signInWorkshop() {
    if (this.state.Enabled) this.updateUserProgress(0);
  }

  getProgressData() {
    let email = encodeURIComponent(this.props.database.auth().currentUser.email).replace(/\./g, '%2E')
    console.log(email)
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .onSnapshot((snapshot) => {
        console.log('new values from listener')
        console.log(snapshot.data().testProgress[email])
        this.setState({
          Level_Enabled: snapshot.data().Level_Enabled,
          Enabled: snapshot.data().Enabled,
        });
        if(snapshot.data().testProgress[email])
        {
          this.setState({
            initialProgress: snapshot.data().testProgress[email],
            dataLoaded: true
          })
        }
        else
        {
          this.setState({
            initialProgress: 0,
            dataLoaded: true
          })
        }
      });
  }

  updateUserProgress(progress) {
    var result = encodeURIComponent(this.props.database.auth().currentUser.email).replace(/\./g, '%2E')
    this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .update({ 
        ['testProgress.' + result] : progress,
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
