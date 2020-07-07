import * as React from "react";
import AdminDashboard from "./AdminDashboard";
import {
  loginAction,
  logoutAction,
  authInterface,
} from "../../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import LandingPage from "../Pages/LandingPage";

interface AdminProps {
  database: firebase.app.App;
  auth0?: any;

  loggedIn?: boolean; //redux
  login(username: string): void; //redux
  logout(): void; //redux
}

interface AdminState {

}

/**
 * This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 */
class Admin extends React.Component<AdminProps, AdminState> {

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
        if (user) {
          //only ACM Organization Officers have access to admin
          if (user.email?.includes("@acmutd.co")) {
            this.props.login("random");
          } else {
            this.signOutUser(); //sign out if the user logged into firebase is not ACM Organization Officer
          }
        } else {
          this.props.logout();
        }
      });
  }

  componentDidUpdate() {
    const { isAuthenticated, isLoading } = this.props.auth0;

    if (
      !isLoading &&
      isAuthenticated &&
      !this.props.loggedIn
    ) {
      this.authenticate();
    }
  }

  /**
   * This function runs if the user has authenticated themselves on auth0 but not on firebase
   * Contacts firestore and authenticates the user
   * Sets user data if user login works
   * @param {string} email
   * @param {string} password
   */
  authenticate = async () => {
    const { getAccessTokenSilently, user, logout } = this.props.auth0;

    if (user.email.includes("@acmutd.co")) {
      const accessToken = await getAccessTokenSilently({
        audience: `https://harshasrikara.com/api`,
        scope: "read:current_user",
      });
      const response = await fetch(
        `https://us-central1-trackit-271619.cloudfunctions.net/api/getCustomToken`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      this.props.database
        .auth()
        .signInWithCustomToken(data.firebaseToken)
        .then((userFirebase) => {
          this.props.login("random");
          if (this.props.database.auth().currentUser?.email !== null) {
            //this user has signed in before (do nothing)
          } else {
            //update fields if its the first time they are signing in
            this.props.database.auth().currentUser?.updateProfile({
              displayName: user.nickname,
              photoURL: user.picture,
            });
            this.props.database.auth().currentUser?.updateEmail(user.email);
          }
        })
        .catch((error: firebase.auth.AuthError) => {
          console.log({
            message: "Firebase Auth Error when signing in",
            error: error
          });
          logout();
        });
    } else {
      logout();
      console.log("Unauthorized! Only ACM Officers permitted access!");
    }
  };

  /**
   * signs out the user
   */
  signOutUser = () => {
    const { logout } = this.props.auth0;
    logout();
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        this.props.logout();
        this.setState({
          loginError: false,
        });
      })
      .catch((error: firebase.auth.AuthError) => {
        console.log({
          message: "Error signing user out",
          error: error
        });
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
        {this.props.loggedIn ? (
          <AdminDashboard
            database={this.props.database}
            signOut={this.signOutUser}
          />
        ) : (
          <LandingPage />
        )}
      </div>
    );
  }
}

const mapState = (state: any) => {
  return {
    loggedIn: state.authenticateReducer.loggedIn,
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

export default connect(mapState, mapDispatch)(withAuth0(Admin));
