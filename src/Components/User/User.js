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
      removeListener: null,
      Level_Enabled: 0,
      dataLoaded: false
    };

    this.authenticate = this.authenticate.bind(this);
    this.authenticateWorkshop = this.authenticateWorkshop.bind(this);
    this.signInWorkshop = this.signInWorkshop.bind(this);
    this.getWorkshopData = this.getWorkshopData.bind(this);
  }

  componentWillUnmount()
  {
    this.state.removeListener();
  }

  // contacts firestore and authenticates the user. Sets user data if user login works.
  authenticate(email, password) 
  {
    this.props.database.auth().signInWithEmailAndPassword(email, password).catch(err =>
      {
        console.log("Invalid Email or Password")
      })
    this.props.database.auth().onAuthStateChanged( user =>
      {
        if(user) // user is signed in
        {
          this.setState({
            loggedIn: true
          })
        }
      })
  }

  authenticateWorkshop(workshop)
  {
    this.props.database.firestore().collection('Workshop').doc(workshop).get().then(doc =>
      {
          if(doc.empty)
              console.log('no workshop found');
          else
          {
            this.setState(
            { 
              workshopID: workshop
            },
            this.getWorkshopData) // callback for setState is set to readFromDatabase()
          }
      })
  }
 
  signInWorkshop()
  {
    
  }

  getWorkshopData()
  {
      var removeListener = this.props.database.firestore().collection('Workshop').doc(this.state.workshopID)
          .get().then(snapshot =>
          {
              console.log(snapshot.data())
              this.setState({
                  workshop_data: snapshot.data(),
              }, this.getProgressData)
          })
  }

  getProgressData()
  {
    var removeListener = this.props.database.firestore().collection('StudentsAtWorkshop').doc(this.state.workshopID)
          .onSnapshot(snapshot =>
          {
              console.log(snapshot.data() + "inside progress")
              this.setState({
                  Level_Enabled: snapshot.data().Level_Enabled,
                  dataLoaded: true
              })
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
            <UserDash database = {this.props.database} workshop_data = {this.state.workshop_data} 
            removeListener = {this.state.removeListener} Level_Enabled = {this.state.Level_Enabled}/>
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
