import * as React from "react";
import UserDash from "../views/UserDash";
import WorkshopLogin from "../components/User/WorkshopLogin";
import { workshopFirebase, workshop } from "../config/interface";
import { withAuth0 } from "@auth0/auth0-react";
import LandingPage from "../views/LandingPage";
import { connect } from "react-redux";
import {
  workshopAuthenticationAction,
  workshopDataAction,
} from "../actions/user";
import { loginAction, logoutAction } from "../actions/authentication";
import app from "../config/firebase";

interface UserProps {
  auth0?: any;

  workshop_data?: any;
  updateWorkshopID: any;
  workshopID?: any;
  updateWorkshopData: any;

  loggedIn: boolean;
  login(): void;
  logout(): void;
}

interface UserState {
  workshopID: string;
  workshop_data: workshop | null; //null when unitialized, perhaps we may want to create a dummy workshop in the constructor (or as default props)
  Level_Enabled: number;
  dataLoaded: boolean;
  Enabled: boolean;
  loginError: boolean;
}

class User extends React.Component<UserProps, UserState> {
  state: UserState = {
    workshopID: "",
    workshop_data: null,
    Level_Enabled: 0,
    dataLoaded: false,
    Enabled: false,
    loginError: false,
  };
  loginListener?: firebase.Unsubscribe;

  /**
   * Sign out the user if the page crashes or components gets unmounted
   */
  componentWillUnmount() {
    //remove progress listener
    if (this.loginListener) this.loginListener();
  }

  componentDidMount() {
    this.loginListener = app
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        if (user) {
          this.props.login();
        } else {
          this.props.logout();
        }
      });
  }
  componentDidUpdate() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    if (!isLoading && isAuthenticated && !this.props.loggedIn) {
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
    //resets the state of login error to be false
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }

    const { getAccessTokenSilently, user } = this.props.auth0;

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
    app
      .auth()
      .signInWithCustomToken(data.firebaseToken)
      .then((userFirebase) => {
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
      })
      .catch((error: firebase.auth.AuthError) => {
        this.setState({
          loginError: true,
        });
        console.log({
          error: error,
          message: "Invalid Credentials",
        });
      });
  };

  /**
   * Once the user is signed in they will enter the workshop_ID
   * This will validate that said workshop exists, is enabled and if so will open up the user dashboard
   * @param {string} workshop
   */
  authenticateWorkshop = (workshop: string) => {
    //reset the login error if any occurred during authentication
    //same variable gets reused to see if any errors happen in authenticating the workshop name
    if (this.state.loginError) {
      this.setState({
        loginError: false,
      });
    }

    //read the workshop data if present else trigger a alert
    app
      .firestore()
      .collection("Workshop")
      .doc(workshop)
      .get()
      .then((doc: workshopFirebase) => {
        if (!doc.exists) {
          this.setState({
            loginError: true,
          });
        } else {
          let workshopObject: workshop = {
            Date: doc.data()?.Date,
            Level_Descriptions: doc.data()?.Level_Descriptions,
            Level_Titles: doc.data()?.Level_Titles,
            Number_Of_Levels: doc.data()?.Number_Of_Levels,
            Workshop_ID: doc.data()?.Workshop_ID,
            Workshop_Name: doc.data()?.Workshop_Name,
          };
          // update redux
          this.props.updateWorkshopData(workshopObject);
          this.props.updateWorkshopID(workshop);
          this.setState({
            workshop_data: workshopObject,
            workshopID: workshop,
          });
        }
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        console.log({
          error: error,
          message: "Error occurred in reading back the workshop information",
        });
      });
  };

  render() {
    const { isAuthenticated, isLoading, user } = this.props.auth0;

    let userID: string = "";
    if (!isLoading && isAuthenticated && user) {
      userID = user.email.substring(0, user.email.lastIndexOf("@"));
    }

    return (
      <div>
        {!isLoading && isAuthenticated && this.props.loggedIn ? (
          !this.state.workshop_data ? (
            <WorkshopLogin
              authenticate={this.authenticateWorkshop}
              loginError={this.state.loginError}
            />
          ) : (
            <UserDash user={userID} />
          )
        ) : (
          <LandingPage />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateWorkshopID: (workshopID: string) => {
      dispatch(workshopAuthenticationAction(workshopID));
    },
    updateWorkshopData: (workshop_data: workshopFirebase) => {
      dispatch(workshopDataAction(workshop_data));
    },
    login: () => {
      dispatch(loginAction());
    },
    logout: () => {
      dispatch(logoutAction());
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    workshopID: state.userReducer.workshopID,
    workshop_data: state.userReducer.workshop_data,
    loggedIn: state.authenticateReducer.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(User));
