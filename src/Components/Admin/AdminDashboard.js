import React from "react";
import WorkshopBar from "../Workshop/WorkshopBar";
import NavBar from "../Layout/NavBar";
import Workshop from "../Workshop/Workshop";
import WorkshopEdit from "../Workshop/WorkshopEdit";
import CardTile from "../Workshop/CardTile";
import { Row, Col, Container } from "react-bootstrap";

/**
 * UI component that manages how the admin dashboard looks like
 *
 * Author: Harsha Srikara
 * Date: 4/16/20
 */
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('opening dash')

    let openDialog = () => {
      this.showHideAddEditDialog();
    };

    //more hard coded data here, this is for the texts present in the cards present on the dashboard
    let cfirst = {
      title: "Admin",
      subtitle: "Administrative Tools",
      description: "Configuration tool for setting up new workshops",
      links: ["", "", openDialog, ""],
      linkText: [
        "Download Workshops",
        "Transfer Workshops",
        "Add Workshop",
        "Delete Workshops",
      ],
    };

    let csecond = {
      title: "Development",
      subtitle: "Development Tools",
      description: "Try out beta tools for customizing trackit",
      links: [],
      linkText: [],
    };

    let cthird = {
      title: "Social",
      subtitle: "Media Tools",
      description: "Access resources and social media",
      links: [],
      linkText: ["Github", "LinkedIn", "Instagram"],
    };

    //additional hard coded data
    //this is the main part that needs to constantly be read from the database, everything else is read one time only
    //the represents the StudentsAtWorkshop collection on firebase
    let wfirst = {
      Workshop_ID: "firebase",
      Enabled: false,
      Level_Enabled: 1,
      Students: ["anirudh", "harsha", "sivam", "patel", "emmadi", "srikara"],
      Progress: [3, 2, 2, 4, 5, 5],
    };

    let wsecond = {
      Workshop_ID: "azure",
      Enabled: false,
      Level_Enabled: 1,
      Students: ["atharv", "gautam", "aashish", "jain", "sapre", "sharma"],
      Progress: [1, 3, 4, 1, 4, 4],
    };

    let wthird = {
      Workshop_ID: "AWS",
      Enabled: false,
      Level_Enabled: 1,
      Students: [
        "sanjana",
        "ifrit",
        "shivani",
        "vamika",
        "sanjeev",
        "penupala",
      ],
      Progress: [5, 4, 2, 1, 3, 4],
    };

    this.state = {
      workshops: this.props.workshop_data, //[first, second, third], //this will eventually be passed in through props
      cards: [cfirst, csecond, cthird], //will be " " " "
      studentsAtWorkshop: this.props.student_data, // will be  " " " "
      viewWorkshop: false, //toggle between true or false
      workshopView: 1, //change this number to 0 1 or 2

      addWorkshopDialogState: false,
    };
    this.openWorkshopWindow = this.openWorkshopWindow.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.enableWorkshop = this.enableWorkshop.bind(this);
    this.disableWorkshop = this.disableWorkshop.bind(this);
    this.clearAllStudents = this.clearAllStudents.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);
    this.addEditWorkshop = this.addEditWorkshop.bind(this);
    this.exportWorkshop = this.exportWorkshop.bind(this);
    this.findWorkshopIndex = this.findWorkshopIndex.bind(this);
    this.receiveAddEditWorkshopInformationFromDialog = this.receiveAddEditWorkshopInformationFromDialog.bind(
      this
    );
    this.showHideAddEditDialog = this.showHideAddEditDialog.bind(this);
  }

  componentDidUpdate(prevProps)
  {
      if(this.props.workshop_data !== prevProps.workshop_data)
      {
          this.setState({
              workshops: this.props.workshop_data
          })
      }
      if(this.props.student_data !== prevProps.student_data)
      {
          this.setState({
              studentsAtWorkshop: this.props.student_data
          })
      }
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
    this.setState((state) => ({
      viewWorkshop: !state.viewWorkshop,
      workshopView: workshopIndex,
    }));
  }

  enableWorkshop(Workshop_ID) {
    console.log(Workshop_ID)
    let workshopIndex = this.findWorkshopIndex(Workshop_ID);
    console.log(workshopIndex)
    let temp = this.state.studentsAtWorkshop[workshopIndex];
    temp.Enabled = true;
    let tempArray = this.state.studentsAtWorkshop;
    tempArray[workshopIndex] = temp;
    this.setState((state) => ({ studentsAtWorkshop: tempArray }));
    console.log("test");
  }

  disableWorkshop(Workshop_ID) {
    let workshopIndex = this.findWorkshopIndex(Workshop_ID);
    let temp = this.state.studentsAtWorkshop[workshopIndex];
    temp.Enabled = false;
    let tempArray = this.state.studentsAtWorkshop;
    tempArray[workshopIndex] = temp;
    this.setState((state) => ({ studentsAtWorkshop: tempArray }));
    console.log("test");
  }

  clearAllStudents(Workshop_ID) {
    this.findWorkshopIndex(Workshop_ID);
    console.log("test");
  }

  deleteWorkshop(Workshop_ID) {
    this.findWorkshopIndex(Workshop_ID);
    console.log("test");
  }

  incrementLevel(Workshop_ID) {
    this.findWorkshopIndex(Workshop_ID);
  this.props.updateLevel(10, Workshop_ID)
    //write code here to push to db that the workshop level has been incremented
    console.log("test");
  }

  decrementLevel(Workshop_ID) {
    this.findWorkshopIndex(Workshop_ID);
    //write code here to push to db that the workshop level has been decremented
    console.log("test");
  }

  exportWorkshop(Workshop_ID) {
    this.findWorkshopIndex(Workshop_ID);
    console.log("test");
  }

  showHideAddEditDialog() {
    this.setState((state) => ({
      addWorkshopDialogState: !state.addWorkshopDialogState,
    }));
  }

  receiveAddEditWorkshopInformationFromDialog(
    Workshop_Object,
    wasSubmitPressed
  ) {
    this.showHideAddEditDialog();
    if (wasSubmitPressed) {
      this.addEditWorkshop(Workshop_Object);
    }
  }

  addEditWorkshop(Workshop_Object) {
    let workshopIndex = this.findWorkshopIndex(Workshop_Object.Workshop_ID);
    if (workshopIndex === -1) {
      let temp = this.state.workshops;
      temp.push(Workshop_Object);
      let tempStudentWorkshop = {
        Workshop_ID: Workshop_Object.Workshop_ID,
        Enabled: false,
        Level_Enabled: 0,
        Students: [],
        Progress: [],
      };
      let tempArr = this.state.studentsAtWorkshop;
      tempArr.push(tempStudentWorkshop);
      this.setState({ workshops: temp, studentsAtWorkshop: tempArr });
    } else {
      let temp = this.state.workshops;
      temp[workshopIndex] = Workshop_Object;
      this.setState({ workshops: temp });
    }
    console.log("test");
  }

  findWorkshopIndex(Workshop_ID) {
    var workshopIndex = -1;
    // loops through array looking for the index that contains inforamtion on that specific workshop, saves that index in workshopView state which then will be passed in as props to the <Workshop /> Component
    for (var i = 0; i < this.state.workshops.length; i++) {
      if (this.state.workshops[i].Workshop_ID === Workshop_ID) {
        workshopIndex = i;
      }
    }
    return workshopIndex;
  }

  render() {
    //maps out the array into UI components, this is for the admin page that shows all workshops which is why expandState is set to false
    let workshopList = this.state.workshops.map((item) => (
      <WorkshopBar
        expandState={false}
        expandWindow={this.openWorkshopWindow}
        data={item}
      />
    ));

    //maps out the array into UI components to be displayed in the tiles at the top
    let tiles = this.state.cards.map((item) => (
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
                  decrementLevel={this.decrementLevel}
                  enableWorkshop={this.enableWorkshop}
                  disableWorkshop={this.disableWorkshop}
                  clearAllStudents={this.clearAllStudents}
                  deleteWorkshop={this.deleteWorkshop}
                  addEditWorkshop={this.addEditWorkshop}
                  exportWorkshop={this.exportWorkshop}
                  properties={this.state.workshops[this.state.workshopView]}
                  data={this.state.studentsAtWorkshop[this.state.workshopView]}
                />
              </div>
            ) : (
              workshopList
            )}
          </div>
          <WorkshopEdit
            isOpen={this.state.addWorkshopDialogState}
            titleText="Workshop Panel"
            messageText="Add workshop information below"
            submit={this.receiveAddEditWorkshopInformationFromDialog}
            newWorkshop={true}
          />
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
