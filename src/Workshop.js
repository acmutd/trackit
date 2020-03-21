import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CanvasJSReact from './assets/canvasjs.react';
import CardTile from './CardTile';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Workshop extends React.Component {
    constructor(props) {
        super(props);
        var dps = [];
        for (var i = dps.length; i < this.props.data.Students.length; i++)
            dps.push({
                label: this.props.data.Students[i],
                y: this.props.data.Progress[i]
            });
        this.state = {
            dataArray: dps
        }
        this.parseDataPoints = this.parseDataPoints.bind(this);
    }


    //code for parsing and adding dynamic data from here --> http://jsfiddle.net/canvasjs/acf0dx6d/
    parseDataPoints() {
        var dps = [];
        for (var i = dps.length; i < this.props.data.Students.length; i++)
            dps.push({
                label: this.props.data.Students[i],
                y: this.props.data.Progress[i]
            });

        this.setState({ dataArray: dps });
        console.log(this.state.dataArray);
    }

    render() {
        console.log(this.state.dataArray);
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: this.props.data.Workshop_ID
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: this.state.dataArray
            }]
        }

        let summaryInfo = {
            title: "Summary Report",
            subtitle: this.props.data.Workshop_ID,
            description: "Number of students: " + this.props.data.Students.length,
            linkone: "",
            linkonetext: "Download Workshop Summary",
            linktwo: "",
            linktwotext: "Download Raw Student Data"
        }

        var tag = "";
        for(var i = 0;i<this.props.properties.Number_Of_Levels;i++) {
            tag += "Level: " + i + "\nDescription: " + this.props.properties.Level_Descriptions[i] + "\n";
        }

        let workshopInfo = {
            title: "Workshop Information",
            subtitle: this.props.properties.Workshop_ID,
            description: tag,
            linkone: "",
            linkonetext: "Download Workshop Content",
            linktwo: "",
            linktwotext: "Access Workshop Resouces"
        }

        return (

            <div>
                <div className="mt-5">
                    <Row>
                        <Col><CardTile data={summaryInfo} /></Col>
                        <Col><CardTile data={workshopInfo} /></Col>
                    </Row>
                </div>
                <div className="floating-icon m-3 mt-5 p-3">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        );
    }
}

export default Workshop;