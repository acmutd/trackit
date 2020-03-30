import React from "react";
import WorkshopBar from "../Workshop/WorkshopBar";
import NavBar from "../Layout/NavBar";
import Workshop from "../Workshop/Workshop";
import CardTile from "../Workshop/CardTile";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

/**
 * UI component that manages how the admin dashboard looks like
 *
 * Author: Harsha Srikara
 * Date: 3/22/20
 */
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);

    //hardcoded data below, will need to eventually read back the same information from firebase and receive it as props
    //data here is missing date field from the database schema, needs to be added in as a field for all items in the array
    //the following three variables represent the workshop collection on firebase
    let first = {
      Level_Descriptions: ["info part 1", "info part 2", "info part 3"],
      Number_Of_Levels: 3,
      Workshop_ID: "firebase",
      Workshop_Name: "firebase",
      Day: "Monday",
      Date: "16",
      Month: "March",
      Year: "2020"
    };

    let second = {
      Level_Descriptions: ["check part 1", "check part 2", "check part 3"],
      Number_Of_Levels: 3,
      Workshop_ID: "azure",
      Workshop_Name: "azure",
      Day: "Tuesday",
      Date: "17",
      Month: "March",
      Year: "2020"
    };

    let third = {
      Level_Descriptions: ["info part 1", "info part 2", "info part 3"],
      Number_Of_Levels: 3,
      Workshop_ID: "aws",
      Workshop_Name: "aws",
      Day: "Wednesday",
      Date: "18",
      Month: "March",
      Year: "2020"
    };

    //more hard coded data here, this is for the texts present in the cards present on the dashboard
    let cfirst = {
      title: "Admin",
      subtitle: "Administrative Tools",
      description: "Advanced tools for configurating workshop data",
      linkone: "#",
      linkonetext: "",
      linktwo: "#",
      linktwotext: ""
    };

    let csecond = {
      title: "Development",
      subtitle: "Development Tools",
      description: "Try out beta tools for customizing trackit",
      linkone: "#",
      linkonetext: "",
      linktwo: "#",
      linktwotext: ""
    };

    let cthird = {
      title: "Social",
      subtitle: "Media Tools",
      description: "Access resources and social media",
      linkone: "#",
      linkonetext: "",
      linktwo: "#",
      linktwotext: "link"
    };

    //additional hard coded data
    //this is the main part that needs to constantly be read from the database, everything else is read one time only
    //the represents the StudentsAtWorkshop collection on firebase
    let wfirst = {
      Workshop_ID: "firebase",
      Level_Enabled: 0,
      Students: ["anirudh", "harsha", "sivam"],
      Progress: [3, 5, 4]
    };

    let wsecond = {
      Workshop_ID: "azure",
      Level_Enabled: 0,
      Students: ["atharv", "gautam", "aashish"],
      Progress: [2, 3, 4]
    };

    let wthird = {
      Workshop_ID: "aws",
      Level_Enabled: 0,
      Students: [
        "sanjana",
        "ifrit",
        "shivani",
        "vamika",
        "sanjeev",
        "penupala"
      ],
      Progress: [5, 4, 2, 1, 3, 4]
    };

    this.state = {
      workshops: [first, second, third], //this will eventually be passed in through props
      cards: [cfirst, csecond, cthird], //will be " " " "
      studentsAtWorkshop: [wfirst, wsecond, wthird], // will be  " " " "
      viewWorkshop: false, //toggle between true or false
      workshopView: 1 //change this number to 0 1 or 2
    };
    this.openWorkshopWindow = this.openWorkshopWindow.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
  }

  /**
   * Changes the viewWorkshop state to true/false, this function is passed in as props to the <WorkshopBar /> Component which will return the its respective Workshop_ID back as param
   *
   * @param {*} Workshop_ID is the name of the workshop that needs to be expanded, received from <WorkshopBar /> Component
   */
  openWorkshopWindow(Workshop_ID) {
    var workshopIndex = 0;
    // loops through array looking for the index that contains inforamtion on that specific workshop, saves that index in workshopView state which then will be passed in as props to the <Workshop /> Component
    for (var i = 0; i < this.state.workshops.length; i++) {
      if (this.state.workshops[i].Workshop_ID === Workshop_ID) {
        workshopIndex = i;
      }
    }
    this.setState(state => ({
      viewWorkshop: !state.viewWorkshop,
      workshopView: workshopIndex
    }));
  }

  incrementLevel(Workshop_ID) {
    var workshopIndex = 0;
    // loops through array looking for the index that contains inforamtion on that specific workshop, saves that index in workshopView state which then will be passed in as props to the <Workshop /> Component
    for (var i = 0; i < this.state.workshops.length; i++) {
      if (this.state.workshops[i].Workshop_ID === Workshop_ID) {
        workshopIndex = i;
      }
    }

    //write code here to push to db that the workshop level has been incremented

  }

  render() {
    //maps out the array into UI components, this is for the admin page that shows all workshops which is why expandState is set to false
    let workshopList = this.state.workshops.map(item => (
      <WorkshopBar
        expandState={false}
        expandWindow={this.openWorkshopWindow}
        data={item}
      />
    ));

    //maps out the array into UI components to be displayed in the tiles at the top
    let tiles = this.state.cards.map(item => (
      <Col>
        <CardTile data={item} />
      </Col>
    ));

    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="m-5">
            <Row>{tiles}</Row>
          </div>

          <div className="m-5">
            {/* If the admin dashbaord should be displaying the expanded view of a workshop then it displays the <WorkshopBar /> at the top followed by the <Workshop />, else it displays a list of all the <WorkshopBar /> */}
            {this.state.viewWorkshop ? (
              <div>
                <WorkshopBar
                  expandState={true}
                  expandWindow={this.openWorkshopWindow}
                  data={this.state.workshops[this.state.workshopView]}
                />
                <Workshop
                  incrementLevel={this.incrementLevel}
                  properties={this.state.workshops[this.state.workshopView]}
                  data={this.state.studentsAtWorkshop[this.state.workshopView]}
                />
              </div>
            ) : (
              workshopList
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
