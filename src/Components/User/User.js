import React from "react";
import firebase from 'firebase';
import UserAuth from './UserAuth';
import UserDash from './UserDash';
import WorkshopLogin from './WorkshopLogin';

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
    };

    this.authenticate = this.authenticate.bind(this);
    this.authenticateWorkshop = this.authenticateWorkshop.bind(this);
    this.signInWorkshop = this.signInWorkshop.bind(this);
    this.updateUserProgress = this.updateUserProgress.bind(this);
    this.getProgressData = this.getProgressData.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentWillUnmount()
  {
    if(this.progressListener)
      this.progressListener();
  }

  // contacts firestore and authenticates the user. Sets user data if user login works.
  authenticate(email, password) 
  {
    if(this.props.database.currentUser !== undefined)
      {
        console.log(this.props.database.currentUser)
        this.setState({
          loggedIn: true
        })
      }
    this.props.database.auth().signInWithEmailAndPassword(email, password).catch(err =>
      {
        console.log("Invalid Email or Password")
      })
    this.props.database.auth().onAuthStateChanged(user =>
      {
        if(user) // user is signed in
        {
          this.setState({
            loggedIn: true
          })
        }
      })
      return this.props.database.currentUser !== undefined;
  }

  authenticateWorkshop(workshop)
  {
    this.props.database.firestore().collection('Workshop').doc(workshop).get().then(doc =>
      {
          if(!doc.exists)
              return;
          else
          {
            this.setState(
            { 
                workshop_data: doc.data(),
                workshopID: workshop
            }, this.getProgressData)
          }
      })
      return false;
  }
 
  signInWorkshop()
  {
    if(this.state.Enabled)
      this.updateUserProgress(0);
  }

  getProgressData()
  {
    this.progressListener = this.props.database.firestore().collection('StudentsAtWorkshop').doc(this.state.workshopID)
          .onSnapshot(snapshot =>
          {
              console.log(snapshot.data())
              this.setState({
                  Level_Enabled: snapshot.data().Level_Enabled,
                  Enabled: snapshot.data().Enabled,
                  dataLoaded: true
              })
          })
  }

updateUserProgress(progress)
{
  // BELOW IS CODE TO UPDATE IF PROGRESS STORES IN A MAP
  this.props.database.firestore().collection('StudentsAtWorkshop').doc(this.state.workshopID).update({
    ['Progress.' + this.props.database.auth().currentUser.uid] : progress
  }).then(() => {
    console.log("updated")
  })
}

signOutUser()
  {
    console.log('signing Out');
    this.props.database.auth().signOut().then(() =>
    {
      this.setState({
        loggedIn: false, //once authentication happens this will toggle to true
        workshopID: null,
        workshop_data: null,
        Level_Enabled: 0,
        dataLoaded: false,
        Enabled: false,
      })
    }).catch(err =>
      {
        console.log("error signing user out")
      })
  }

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          ( this.state.dataLoaded == false ? (
          <WorkshopLogin authenticate = {this.authenticateWorkshop}/>
          ) : (
            <UserDash workshop_data = {this.state.workshop_data} updateUserProgress = {this.state.updateUserProgress} 
            progressListener = {this.progressListener} Level_Enabled = {this.state.Level_Enabled} signOut = {this.signOutUser} />
          )
          )
        ) : (
          <UserAuth authenticate={this.authenticate} />
        )}
      </div>
    );
  }
}

export default User;
