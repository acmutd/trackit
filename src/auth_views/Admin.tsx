import * as React from "react";
import AdminDashboard from "../views/AdminDashboard";
import { loginAction, logoutAction, authInterface } from "../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import LandingPage from "../views/LandingPage";
import app from "../config/firebase";
//import { useHistory } from "react-router-dom";
console.log('hi from admin')
interface AdminProps {
  auth0?: any;
  state: any;
  loggedIn?: boolean; //redux
  login: () => void; //redux
  logout: () => void; //redux
}
/**
 * This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 */
class Admin extends React.Component<any, any> {
  //history = useHistory();
  loginListener?: firebase.Unsubscribe;
  /**
   * If the page crashes then the user gets automatically logged out
   */

  /**
   * This function runs if the user has authenticated themselves on auth0 but not on firebase
   * Contacts firestore and authenticates the user
   * Sets user data if user login works
   * @param {string} email
   * @param {string} password
   */
  authenticate = async () => {
    console.log('in authenticate admin')
    const { getAccessTokenSilently, user, logout } = this.props.auth0;

    const accessToken = await getAccessTokenSilently({
      audience: `https://harshasrikara.com/api`,
      scope: "read:current_user",
    });
    const response = await fetch(`http://localhost:5001/trackit-285205/us-central1/api/getCustomToken`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    app
      .auth()
      .signInWithCustomToken(data.firebaseToken)
      .then(async (userFirebase) => {
        this.props.login();
        if (app.auth().currentUser?.email !== null) {
          //this user has signed in before (do nothing)
        } else {
          //update fields if its the first time they are signing in
          app.auth().currentUser?.updateProfile({
            displayName: user.nickname,
            photoURL: user.picture,
          });
          app.auth().currentUser?.updateEmail(user.email);
        }

        const groups = await app
          .auth()
          .currentUser?.getIdTokenResult()
          .then((token: any) => {
            return token.claims.Groups;
          })
          .catch((err: any) => {
            return [""];
          });
        if (groups.length === 1 && groups[0] === "") {
          //this.history.push("/");
        }
      })
      .catch((error: firebase.auth.AuthError) => {
        console.log({
          message: "Firebase Auth Error when signing in",
          error: error,
        });
        logout();
      });
  };

  /**
   * signs out the user
   */
  signOutUser = () => {
    const { logout } = this.props.auth0;
    logout();
    app
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
          error: error,
        });
      });
  };

  /**
   * renders the page
   */
  render() {
    console.log(this.props.state)
    console.log('hi in admin')
    console.log(this.props.loggedIn);
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.props.loggedIn ? <AdminDashboard signOut={this.signOutUser} /> : <LandingPage />}
      </div>
    );
  }
}

const mapState = (state: any) => {
  return {
    loggedIn: state.authenticateReducer.loggedIn,
    tempState: state,
  };
};

const mapDispatch = (dispatch: (action: authInterface) => void) => {
  return {
    login: () => {
      dispatch(loginAction());
    },
    logout: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapState, mapDispatch)(withAuth0(Admin));
