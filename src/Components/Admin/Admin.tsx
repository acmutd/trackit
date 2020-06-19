import * as React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import {
  userFirebase,
} from "../Config/interface";
import { loginAction, logoutAction, authInterface } from "../../actions/authentication";
import RootReducer from "../../reducers/rootReducer";
import { connect } from "react-redux";

interface AdminProps {
  database: firebase.app.App;
}

interface AdminState {
  loggedIn: boolean;
  loginError: boolean;
  alert: boolean;
  alertText: string;
}

/**
 * This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 */
class Admin extends React.Component<any, AdminState> {
  state: AdminState = {
    loggedIn: false, //once authentication happens this will toggle to true
    loginError: false,
    alert: false,
    alertText: "",
  };

  loginListener?: firebase.Unsubscribe;
  /**
   * If the page crashes then the user gets automatically logged out
   */
  componentWillUnmount() {
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
            .then((doc: userFirebase) => {
              // if the user has admin acess then set loggedIn to true
              if (doc.data()?.isAdmin === true) {
                this.setState({
                  loggedIn: true,
                });
                this.props.login("hello");
                console.log(this.props.loggedIn);
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
                  .catch((error: firebase.auth.AuthError) => {
                    console.log(error + " error logging out non admin user");
                  });
              }
            })
            .catch((error: firebase.firestore.FirestoreError) => {
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
      .catch((error: firebase.auth.AuthError) => {
        this.setState({
          loginError: true,
        });
        console.log(error + " Invalid Email or Password");
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
        });
      })
      .catch((error: firebase.auth.AuthError) => {
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
   * renders the page
   */
  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          <AdminDashboard
            database={this.props.database}
            signOut={this.signOutUser}
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

const mapState = (state: any) => {
  return {
    loggedIn: state.authenticateReducer.loggedIn
  };
};

const mapDispatch = (dispatch: (action: authInterface) => void) => {
  return {
    login: (username: string) => {
      dispatch(loginAction(username));
    },
    logout: () => {
      dispatch(logoutAction());
    },
  };
};



export default connect(mapState, mapDispatch)(Admin);
