import React from 'react';
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

        return (

            <div>
                <CardTile data={summaryInfo} />
                <div className="floating-icon m-3 mt-5 p-3">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        );
    }
}

export default Workshop;