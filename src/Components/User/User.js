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
      workshop_date: null,
      removeListener: null,
      dataLoaded: false
    };

    this.authenticate = this.authenticate.bind(this);
    this.authenticateWorkshop = this.authenticateWorkshop.bind(this);
    this.readFromDatabase = this.readFromDatabase.bind(this);
  }

  componentWillUnmount()
  {
    this.state.removeListener();
  }

  // contacts firestore and authenticates the user. Sets user data if user login works.
  authenticate(userName, password) 
  {
    this.props.database.firestore().collection('Student').doc(userName).get().then(doc =>
      {
          if(doc.empty)
              console.log('no workshop found');
          else
          {
            if(password === doc.data().Password)
            {
              this.setState({
                loggedIn: true
              })
              console.log("user found. logged in")
            }
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
            this.readFromDatabase) // callback for setState is set to readFromDatabase()
          }
      })
  }
 
  readFromDatabase()
  {
      var removeListener = this.props.database.firestore().collection('Workshop').doc(this.state.workshopID)
          .onSnapshot(snapshot =>
          {
              console.log(snapshot.data())
              this.setState({
                  workshop_data: snapshot.data(),
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
            <UserDash database = {this.props.database} workshop_data = {this.state.workshop_data} removeListener = {this.state.removeListener}/>
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
