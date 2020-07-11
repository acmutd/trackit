import * as React from "react";
import UserAuth from "./UserAuth";
import UserDash from "./UserDash";
import WorkshopLogin from "./WorkshopLogin";
import { studentsAtWorkshopFirebase, workshopFirebase, workshop } from "../Config/interface"

interface UserProps {
  database: firebase.app.App,
}

interface UserState {
  loggedIn: boolean,
  workshopID: string,
  workshop_data: workshop | null, //null when unitialized, perhaps we may want to create a dummy workshop in the constructor (or as default props)
  Level_Enabled: number,
  dataLoaded: boolean,
  Enabled: boolean,
  loginError: boolean,
  initialProgress: number,
  alert: boolean,
  alertText: string
}

class User extends React.Component<UserProps, UserState> {
  state: UserState = {
    loggedIn: false, //once authentication happens this will toggle to true
    workshopID: "",
    workshop_data: null,
    Level_Enabled: 0,
    dataLoaded: false,
    Enabled: false,
    loginError: false,
    initialProgress: 0,
    alert: false,
    alertText: "Unknown error occurred",
  };
  progressListener?: firebase.Unsubscribe;
  loginListener?: firebase.Unsubscribe;

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

  /**
   * Contacts firestore and authenticates the user
   * Sets user data if user login works
   * @param {string} email
   * @param {string} password
   */
  authenticate = (email: string, password: string) => {
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
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          loginError: true,
        });
        console.log(error + " Invalid Email or Password");
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
        this.setState({
          alert: true,
          alertText: error + " Error occurred in reading back workshop information",
        });
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
  getProgressData = () => 
  {    
    // //convert .,@ and other weird symbols in emails to be of a proper format
    let email: string = encodeURIComponent(this.props.database.auth().currentUser?.email as string).replace(/\./g, "%2E");
    
    //set listener on firestore
    this.progressListener = this.props.database
      .firestore()
      .collection("StudentsAtWorkshop")
      .doc(this.state.workshopID)
      .onSnapshot((snapshot: studentsAtWorkshopFirebase | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => { //query snapshot too strict of a definition, firebase does not verify if data is present
        console.log("new values from listener");
        if(snapshot !== undefined)
        {
          console.log(snapshot.data()?.testProgress[email]);
        this.setState({
          Level_Enabled: snapshot.data()?.Level_Enabled,
          Enabled: snapshot.data()?.Enabled,
        });
        if (snapshot.data()?.testProgress[email]) {
          //if the user is logging back onto a workshop
          this.setState({
            initialProgress: snapshot.data()?.testProgress[email],
            dataLoaded: true,
          });
        } else {
          //if a user is logging onto a workshop for the first time
          this.setState({
            initialProgress: -1,
            dataLoaded: true,
          });
        }
        }
      });
  };

  /**
   * Update the progress in firestore for a given student when they click markCompleted in the UI
   * @param {number} progress
   */
  updateUserProgress = (progress: number) => {
    let result: string = encodeURIComponent(this.props.database.auth().currentUser?.email as string).replace(/\./g, "%2E");

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
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating user progress",
        });
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
          workshopID: "",
          workshop_data: null,
          Level_Enabled: 0,
          dataLoaded: false,
          Enabled: false,
        });
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in signing out the user",
        });
        console.log(error + " error signing user out");
      });
  };

  resetAlertStatus = () => {
    this.setState({
      alert: false,
      alertText: "Unknown error occurred",
    })
  }

  render() {
    var userID: any = this.props.database.auth().currentUser?.email || ""
    if(userID !== null)
    {
      userID = userID.substring(
        0, userID.lastIndexOf("@"))
    }
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
              user={userID}
              alert={this.state.alert}
              alertText={this.state.alertText}
              resetAlertStatus={this.resetAlertStatus}
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
