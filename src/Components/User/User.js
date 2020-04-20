import React from "react";
import UserAuth from "./UserAuth";
import UserDash from "./UserDash";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, //once authentication happens this will toggle to true
      name: "",
      workshop: "",
      workshop_data: null,
    };

    this.authenticate = this.authenticate.bind(this);
    this.readFromDatabase = this.readFromDatabase.bind(this);
  }

  authenticate(userName, workshop_name) {
    this.readFromDatabase(workshop_name);
    this.setState({
      name: userName,
      workshop: workshop_name,
      loggedIn: true,
    });
  }

  readFromDatabase(workshop_name) {
    /*
    let db = this.props.database;
    db.collection("Workshop").doc(workshop_name).get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log(" data :" + doc.data().Date)
          this.setState({
              workshop_data: doc.data()
          })
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
      */

    let first = {
      Level_Descriptions: [
        "info part 1",
        "info part 2",
        "info part 3",
        "part 4",
        "part 5",
      ],
      Number_Of_Levels: 5,
      Workshop_ID: "firebase",
      Workshop_Name: "firebase",
      Day: "Monday",
      Date: "16",
      Month: "March",
      Year: "2020",
      level_text: [
        "Setup the project",
        "Researc the project",
        "Learn the Project",
        "Do the Project",
        "Present the Project",
      ],
    };

    this.setState({
      workshop_data: first,
    });
  }

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          <UserDash workshop_data={this.state.workshop_data} />
        ) : (
          <UserAuth authenticate={this.authenticate} />
        )}
      </div>
    );
  }
}

export default User;
