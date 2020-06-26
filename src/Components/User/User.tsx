import * as React from "react";
import UserDash from "./UserDash";
import WorkshopLogin from "./WorkshopLogin";
import { workshopFirebase, workshop } from "../Config/interface";
import { withAuth0 } from "@auth0/auth0-react";
import LandingPage from "../Pages/LandingPage";

interface UserProps {
  database: firebase.app.App;
  auth0?: any;
}

interface UserState {
  loggedIn: boolean;
  workshopID: string;
  workshop_data: workshop | null; //null when unitialized, perhaps we may want to create a dummy workshop in the constructor (or as default props)
  Level_Enabled: number;
  dataLoaded: boolean;
  Enabled: boolean;
  loginError: boolean;
  initialProgress: number;
}

class User extends React.Component<UserProps, UserState> {
  state: UserState = {
    loggedIn: false, //represents whether the user has logged in to their firebase acct, not their auth0
    workshopID: "",
    workshop_data: null,
    Level_Enabled: 0,
    dataLoaded: false,
    Enabled: false,
    loginError: false,
    initialProgress: 0,
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
    this.loginListener = this.props.database
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
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
  componentDidUpdate() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    if (!isLoading && isAuthenticated && !this.state.loggedIn) {
      this.authenticate();
    }
  }

  /**
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

    const { getAccessTokenSilently } = this.props.auth0;

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
      .then(() => {
        this.setState({
          loggedIn: true,
        });
      })
      .catch((error: firebase.auth.AuthError) => {
        this.setState({
          loginError: true,
        });
        console.log(error + " Invalid Credential");
      });
  };

  /**
   * Once the user is signed in they will enter the workshop_ID
   * This will validate that said workshop exists, is enabled and if so will open up the user dashboard
   * @param {string} workshop
   */
  authenticateWorkshop = async (workshop: string) => {
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
          this.setState({
            workshop_data: workshopObject,
            workshopID: workshop,
          });
        }
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        console.log(
          error + " error occurred in reading back workshop information"
        );
      });
  };

  /**
   * Read the progress of the current student from the StudentsAtWorkshop collection on firestore
   * Additionally read whether a workshop is enabled or not and the progress of the admin
   */

  /**
   * Sign out the user when they click sign out
   */
  signOutUser = () => {
    console.log("signing Out");
    const { logout } = this.props.auth0;
    logout();
    this.props.database
      .auth()
      .signOut()
      .then(() => {
        //reset the state
        this.setState({
          loggedIn: false,
          workshopID: "",
          workshop_data: null,
          Level_Enabled: 0,
          dataLoaded: false,
          Enabled: false,
        });
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        console.log(error + " error signing user out");
      });
  };

  render() {
    const { isAuthenticated, isLoading, user } = this.props.auth0;

    if (!isLoading && isAuthenticated && user) {
      var userID: any = user.email || "";
      if (userID !== null) {
        userID = userID.substring(0, userID.lastIndexOf("@"));
      }
    }
    return (
      <div>
        {!isLoading && isAuthenticated ? (
          !this.state.workshop_data ? (
            <WorkshopLogin
              authenticate={this.authenticateWorkshop}
              loginError={this.state.loginError}
            />
          ) : (
            <UserDash
              workshopID={this.state.workshopID}
              workshop_data={this.state.workshop_data}
              database={this.props.database}
              Level_Enabled={this.state.Level_Enabled}
              signOut={this.signOutUser}
              user={userID}
            />
          )
        ) : (
          <LandingPage />
        )}
      </div>
    );
  }
}

export default withAuth0(User);
