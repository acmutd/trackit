import Row from "react-bootstrap/Row";
import React from "react";
import Col from "react-bootstrap/Col";
import CanvasJSReact from "../../assets/canvasjs.react";
import CardTile from "./CardTile";
import StudentBar from "./StudentBar";
import WorkshopLevelBar from "./WorkshopLevelBar";
import ConfirmationDialog from "../Layout/ConfirmationDialog";
import WorkshopEdit from "./WorkshopEdit";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * This component displays the expanded view for a workshop when "Show View" is selected on a <WorkshopBar />
 * Contains summary information about the workshop as well as the graphs
 *
 * Author: Harsha Srikara
 * Date: 3/30/20
 */
class Workshop extends React.Component {
  constructor(props) {
    super(props);

    //this adds the person name and their progress as (label, y) format datapoints for the CanvasJS graph
    var dps = [];

    var xValues = [];
    var yValues = [];

    for (var i = 0; i < this.props.properties.Number_Of_Levels; i++) {
      let a = i + 1; //make the index start from 0 instead of 1
      xValues.push(a + ""); //convert to string to represent as a label instead of coordinate
      yValues.push(0); //initial count for aggregate
    }

    for (var i = 0; i < this.props.data.Progress.length; i++) {
      yValues[this.props.data.Progress[i] - 1] += 1;
    }

    for (var i = 0; i < xValues.length; i++) {
      dps.push({
        label: xValues[i],
        y: yValues[i]
      });
    }

    //this makes the student name x axis and their progress y axis instead of aggregate values
    // for (var i = dps.length; i < this.props.data.Students.length; i++) {
    //   dps.push({
    //     label: i,// this.props.data.Students[i],
    //     y: this.props.data.Progress[i]
    //   });
    // }

    this.state = {
      dataArray: dps,

      confirmationDialog: false, //this is whether or not to show a confirmation dialog
      confirmationState: false,

      addEditWorkshopDialog: false //this is whether or not to show the editing dialog
    };
    this.parseDataPoints = this.parseDataPoints.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.enableWorkshop = this.enableWorkshop.bind(this);
    this.disableWorkshop = this.disableWorkshop.bind(this);
    this.clearAllStudents = this.clearAllStudents.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);
    this.addEditWorkshop = this.addEditWorkshop.bind(this);
    this.exportWorkshop = this.exportWorkshop.bind(this);
    this.showHideDeleteConfirmation = this.showHideDeleteConfirmation.bind(
      this
    );
    this.showHideAddEditDialog = this.showHideAddEditDialog.bind(this);
    this.receiveAddEditWorkshopInformationFromDialog = this.receiveAddEditWorkshopInformationFromDialog.bind(this);
    this.getDialogResponse = this.getDialogResponse.bind(this);
  }

  //this adds the person name and their progress as (label, y) format datapoints for the CanvasJS graph
  //code for parsing and adding dynamic data from here --> http://jsfiddle.net/canvasjs/acf0dx6d/
  //this function does not actually get called
  parseDataPoints() {
    var dps = [];
    for (var i = dps.length; i < this.props.data.Students.length; i++)
      dps.push({
        label: this.props.data.Students[i],
        y: this.props.data.Progress[i]
      });

    this.setState({ dataArray: dps });
  }

  enableWorkshop() {
    this.props.enableWorkshop(this.props.data.Workshop_ID);
  }

  disableWorkshop() {
    this.props.disableWorkshop(this.props.data.Workshop_ID);
  }

  clearAllStudents() {
    this.props.clearAllStudents(this.props.data.Workshop_ID);
  }

  deleteWorkshop() {
    this.showHideDeleteConfirmation();
    this.props.deleteWorkshop(this.props.data.Workshop_ID);
  }

  incrementLevel() {
    this.props.incrementLevel(this.props.data.Workshop_ID);
  }

  decrementLevel() {
    this.props.decrementLevel(this.props.data.Workshop_ID);
  }
  addEditWorkshop() {
    this.showHideAddEditDialog();
    this.props.addEditWorkshop();
  }

  receiveAddEditWorkshopInformationFromDialog(Workshop_Object, wasSubmitPressed) {
    this.showHideAddEditDialog();
  }
  exportWorkshop() {
    this.props.exportWorkshop(this.props.data.Workshop_ID);
  }

  showHideDeleteConfirmation() {
    this.setState(state => ({ confirmationDialog: !state.confirmationDialog, }));
  }
  showHideAddEditDialog() {
    this.setState(state => ({ addEditWorkshopDialog: !state.addEditWorkshopDialog, }));
  }

  getDialogResponse(bool) {
    this.setState({confirmationState: bool});
    this.showHideDeleteConfirmation();
    console.log(this.state.confirmationState);
  }

  render() {
    //mapping student array into <StudentBar />
    let student_progress = this.props.data.Students.map((item, i) => (
      <StudentBar
        TotalProgress={this.props.properties.Number_Of_Levels}
        Progress={this.props.data.Progress[i]}
        Student_Name={item}
      />
    ));

    //options for the CanvasJS graph, configuration basically
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: this.props.data.Workshop_ID
      },
      axisY: {
        valueFormatString: "#"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.state.dataArray
        }
      ]
    };

    //information for the summary report tile
    let summaryInfo = {
      title: "Summary Report",
      subtitle: this.props.data.Workshop_ID,
      description: "Number of students: " + this.props.data.Students.length,
      linkone: "",
      linkonetext: "Download Workshop Summary",
      linktwo: "",
      linktwotext: "Download Raw Student Data"
    };

    //this is the description for the workshop information tile, the newline thing doesnt work for some reason
    var tag = "";
    for (var i = 0; i < this.props.properties.Number_Of_Levels; i++) {
      tag +=
        "Level: " +
        i +
        "\nTitle: " +
        this.props.properties.Level_Titles[i] +
        "\nDescription: " +
        this.props.properties.Level_Descriptions[i] +
        "\n";
    }

    //information for the workshop information tile
    let workshopInfo = {
      title: "Workshop Information",
      subtitle: this.props.properties.Workshop_ID,
      description: tag,
      linkone: "",
      linkonetext: "Download Workshop Content",
      linktwo: "",
      linktwotext: "Access Workshop Resouces"
    };

    //confirmation dialog setup
    let titleText = "Confirmation";
    let messageText =
      "Are you sure about performing this action? This action cannot be reversed.";
      

    return (
      <div>
        <div className="mt-5">
          {/* display two cards followed by a graph */}
          <Row>
            <Col>
              <CardTile data={summaryInfo} />
            </Col>
            <Col>
              <CardTile data={workshopInfo} />
            </Col>
          </Row>
        </div>
        <WorkshopLevelBar
          incrementLevel={this.incrementLevel}
          decrementLevel={this.decrementLevel}
          enableWorkshop={this.enableWorkshop}
          disableWorkshop={this.disableWorkshop}
          clearAllStudents={this.clearAllStudents}
          deleteWorkshop={this.deleteWorkshop}
          addEditWorkshop={this.addEditWorkshop}
          exportWorkshop={this.exportWorkshop}
          Workshop_Level={this.props.data.Level_Enabled}
          enabled={this.props.data.Enabled}
          maxLevel={this.props.properties.Number_Of_Levels}
        />
        <div className="floating-icon m-3 mt-5 p-3">
          <CanvasJSChart options={options} />
        </div>
        {student_progress}
        {/* Thw two componenets below are dialogs, modals that appear to receive additional information */}
        <ConfirmationDialog isOpen={this.state.confirmationDialog} titleText={titleText} messageText={messageText} handleDialogResponse={this.getDialogResponse}/>
        <WorkshopEdit isOpen={this.state.addEditWorkshopDialog} titleText="Workshop Panel" messageText="Edit workshop information below" submit={this.receiveAddEditWorkshopInformationFromDialog} />
      </div>
    );
  }
}

export default Workshop;
