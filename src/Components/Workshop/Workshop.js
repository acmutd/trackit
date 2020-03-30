import Row from "react-bootstrap/Row";
import React from "react";
import Col from "react-bootstrap/Col";
import CanvasJSReact from "../../assets/canvasjs.react";
import CardTile from "./CardTile";
import WorkshopLevelBar from "./WorkshopLevelBar";

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
    for (var i = dps.length; i < this.props.data.Students.length; i++)
      dps.push({
        label: this.props.data.Students[i],
        y: this.props.data.Progress[i]
      });

    this.state = {
      dataArray: dps
    };
    this.parseDataPoints = this.parseDataPoints.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.enableWorkshop = this.enableWorkshop.bind(this);
    this.disableWorkshop = this.disableWorkshop.bind(this);
    this.clearAllStudents = this.clearAllStudents.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);
  }

  //this adds the person name and their progress as (label, y) format datapoints for the CanvasJS graph
  //code for parsing and adding dynamic data from here --> http://jsfiddle.net/canvasjs/acf0dx6d/
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
    this.props.deleteWorkshop(this.props.data.Workshop_ID);
  }

  incrementLevel() {
    this.props.incrementLevel(this.props.data.Workshop_ID);
  }

  decrementLevel() {
    this.props.decrementLevel(this.props.data.Workshop_ID);
  }

  render() {
    //options for the CanvasJS graph, configuration basically
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: this.props.data.Workshop_ID
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
          Workshop_Level={1}
          maxLevel={this.props.properties.Number_Of_Levels} />
        <div className="floating-icon m-3 mt-5 p-3">
          <CanvasJSChart options={options} />
        </div>
      </div>
    );
  }
}

export default Workshop;
