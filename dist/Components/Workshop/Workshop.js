"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const canvasjs_react_1 = require("../../assets/canvasjs.react");
const StudentBar_1 = require("./StudentBar");
const WorkshopLevelBar_1 = require("./WorkshopLevelBar");
const ConfirmationDialog_1 = require("../Layout/ConfirmationDialog");
const WorkshopEdit_1 = require("./WorkshopEdit");
var CanvasJSChart = canvasjs_react_1.default.CanvasJSChart;
/**
 * This component displays the expanded view for a workshop when "Show View" is selected on a <WorkshopBar />
 * Contains summary information about the workshop as well as the graphs
 *
 */
class Workshop extends react_1.default.Component {
    constructor(props) {
        super(props);
        //this adds the person name and their progress as (label, y) format datapoints for the CanvasJS graph
        //code for parsing and adding dynamic data from here --> http://jsfiddle.net/canvasjs/acf0dx6d/
        //this function does not actually get called
        this.parseDataPoints = () => {
            var dps = [];
            for (var i = dps.length; i < this.props.data.Students.length; i++)
                dps.push({
                    label: this.props.data.Students[i],
                    y: this.props.data.Progress[i],
                });
            this.setState({ dataArray: dps });
        };
        /**
         * Link button to function passed in as props
         */
        this.enableWorkshop = () => {
            this.props.enableWorkshop(this.props.data.Workshop_ID);
        };
        /**
         * Link button to function passed in as props
         */
        this.disableWorkshop = () => {
            this.props.disableWorkshop(this.props.data.Workshop_ID);
        };
        /**
         * Link button to function passed in as props
         */
        this.clearAllStudents = () => {
            this.props.clearAllStudents(this.props.data.Workshop_ID);
        };
        /**
         * Link button to function passed in as props
         */
        this.deleteWorkshop = () => {
            this.showHideDeleteConfirmation();
        };
        /**
         * Link button to function passed in as props
         */
        this.incrementLevel = () => {
            this.props.incrementLevel(this.props.data.Workshop_ID);
        };
        /**
         * Link button to function passed in as props
         */
        this.decrementLevel = () => {
            this.props.decrementLevel(this.props.data.Workshop_ID);
        };
        /**
         * Link button to function passed in as props
         */
        this.addEditWorkshop = () => {
            this.showHideAddEditDialog();
        };
        /**
         * Link button to function passed in as props
         * Only called if submit was pressed
         */
        this.receiveAddEditWorkshopInformationFromDialog = (Workshop_Object, wasSubmitPressed) => {
            this.showHideAddEditDialog();
            if (wasSubmitPressed) {
                this.props.addEditWorkshop(Workshop_Object);
            }
        };
        /**
         * Link button to function passed in as props
         */
        this.exportWorkshop = () => {
            this.props.exportWorkshop(this.props.data.Workshop_ID);
        };
        /**
         * Open up the confirmation dialog for deletion
         */
        this.showHideDeleteConfirmation = () => {
            this.setState(state => ({
                confirmationDialog: !state.confirmationDialog,
            }));
        };
        /**
         * Open up the workshop editing dialog
         */
        this.showHideAddEditDialog = () => {
            this.setState(state => ({
                addEditWorkshopDialog: !state.addEditWorkshopDialog,
            }));
        };
        /**
         * Get response from the confirmation dialog on whether to delete the workshop
         */
        this.getDialogResponse = (bool) => {
            this.showHideDeleteConfirmation();
            if (bool) {
                this.props.deleteWorkshop(this.props.data.Workshop_ID);
            }
        };
        //this adds the person name and their progress as (label, y) format datapoints for the CanvasJS graph
        var dps = [];
        var xValues = [];
        var yValues = [];
        for (var i = 0; i < this.props.properties.Number_Of_Levels; i++) {
            let a = i + 1; //make the index start from 0 instead of 1
            xValues.push(a + ""); //convert to string to represent as a label instead of coordinate
            yValues.push(0); //initial count for aggregate
        }
        for (var k = 0; k < this.props.data.Progress.length; k++) {
            yValues[this.props.data.Progress[k] - 1] += 1;
        }
        for (var j = 0; j < xValues.length; j++) {
            dps.push({
                label: xValues[j],
                y: yValues[j],
            });
        }
        this.state = {
            dataArray: dps,
            confirmationDialog: false,
            addEditWorkshopDialog: false,
        };
    }
    /**
     * Refreshes all the information displayed when the props change
     * @param {*} prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            var dps = [];
            var xValues = [];
            var yValues = [];
            for (var i = 0; i < this.props.properties.Number_Of_Levels; i++) {
                let a = i + 1; //make the index start from 0 instead of 1
                xValues.push(a + ""); //convert to string to represent as a label instead of coordinate
                yValues.push(0); //initial count for aggregate
            }
            for (var k = 0; k < this.props.data.Progress.length; k++) {
                yValues[this.props.data.Progress[k] - 1] += 1;
            }
            for (var j = 0; j < xValues.length; j++) {
                dps.push({
                    label: xValues[j],
                    y: yValues[j],
                });
            }
            this.setState({
                dataArray: dps,
            });
        }
    }
    render() {
        //mapping student array into <StudentBar />
        let student_progress = this.props.data.Students.map((item, i) => (react_1.default.createElement(StudentBar_1.default, { TotalProgress: this.props.properties.Number_Of_Levels, Progress: this.props.data.Progress[i], Student_Name: item.substring(0, item.lastIndexOf("@")), key: i })));
        //options for the CanvasJS graph, configuration basically
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: this.props.data.Workshop_ID,
            },
            axisY: {
                valueFormatString: "#",
            },
            data: [
                {
                    type: "column",
                    //indexLabel: "{y}", //Shows y value on all Data Points
                    indexLabelFontColor: "#5A5757",
                    indexLabelPlacement: "outside",
                    dataPoints: this.state.dataArray,
                },
            ],
        };
        //confirmation dialog setup
        let titleText = "Confirmation";
        let messageText = "Are you sure about performing this action? This action cannot be reversed.";
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(WorkshopLevelBar_1.default, { incrementLevel: this.incrementLevel, decrementLevel: this.decrementLevel, enableWorkshop: this.enableWorkshop, disableWorkshop: this.disableWorkshop, clearAllStudents: this.clearAllStudents, deleteWorkshop: this.deleteWorkshop, addEditWorkshop: this.addEditWorkshop, exportWorkshop: this.exportWorkshop, Workshop_Level: this.props.data.Level_Enabled, enabled: this.props.data.Enabled, maxLevel: this.props.properties.Number_Of_Levels }),
            react_1.default.createElement("div", { className: "floating-icon m-2 m-lg-3 mt-3 mt-lg-5 p-3" },
                react_1.default.createElement(CanvasJSChart, { options: options })),
            student_progress,
            react_1.default.createElement(ConfirmationDialog_1.default, { isOpen: this.state.confirmationDialog, titleText: titleText, messageText: messageText, handleDialogResponse: this.getDialogResponse }),
            react_1.default.createElement(WorkshopEdit_1.default, { isOpen: this.state.addEditWorkshopDialog, titleText: "Workshop Panel", messageText: "Edit workshop information below", submit: this.receiveAddEditWorkshopInformationFromDialog, workshop: this.props.properties, newWorkshop: false })));
    }
}
exports.default = Workshop;
//# sourceMappingURL=Workshop.js.map