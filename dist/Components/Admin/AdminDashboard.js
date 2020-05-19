"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const WorkshopBar_1 = require("../Workshop/WorkshopBar");
const NavBar_1 = require("../Layout/NavBar");
const Workshop_1 = require("../Workshop/Workshop");
const WorkshopEdit_1 = require("../Workshop/WorkshopEdit");
const CardTile_1 = require("../Workshop/CardTile");
const Loading_1 = require("../Layout/Loading");
const react_bootstrap_1 = require("react-bootstrap");
const file_saver_1 = require("file-saver");
/**
 * UI component that manages how the admin dashboard looks like
 *
 */
class AdminDashboard extends react_1.default.Component {
    constructor(props) {
        super(props);
        /**
         * Changes the viewWorkshop state to true/false, this function is passed in as props to the <WorkshopBar /> Component which will return the its respective Workshop_ID back as param
         *
         * @param {*} Workshop_ID is the name of the workshop that needs to be expanded, received from <WorkshopBar /> Component
         */
        this.openWorkshopWindow = (Workshop_ID) => {
            let workshopIndex = this.findWorkshopIndex(Workshop_ID);
            this.setState((state) => ({
                viewWorkshop: !state.viewWorkshop,
                workshopView: workshopIndex,
            }));
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.enableWorkshop = (Workshop_ID) => {
            this.props.updateStatus(Workshop_ID, true);
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.disableWorkshop = (Workshop_ID) => {
            this.props.updateStatus(Workshop_ID, false);
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.clearAllStudents = (Workshop_ID) => {
            this.props.clearWorkshop(Workshop_ID);
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.deleteWorkshop = (Workshop_ID) => {
            let workshopIndex = this.findWorkshopIndex(Workshop_ID);
            let workshopArray = this.state.workshops;
            //removes the one workshop element from the array locally before removing from db
            //avoids unexpected read errors due to progress listeners
            workshopArray.splice(workshopIndex, 1);
            this.setState({
                viewWorkshop: false,
                workshops: workshopArray,
            }, function () {
                this.props.deleteWorkshop(Workshop_ID);
            });
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.incrementLevel = (Workshop_ID) => {
            let workshopIndex = this.findWorkshopIndex(Workshop_ID);
            this.props.updateLevel(Workshop_ID, this.state.studentsAtWorkshop[workshopIndex].Level_Enabled + 1);
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.decrementLevel = (Workshop_ID) => {
            let workshopIndex = this.findWorkshopIndex(Workshop_ID);
            this.props.updateLevel(Workshop_ID, this.state.studentsAtWorkshop[workshopIndex].Level_Enabled - 1);
        };
        /**
         * Call function to access firestore from props
         * @param {*} Workshop_ID
         */
        this.exportWorkshop = (Workshop_ID) => {
            const index = this.findWorkshopIndex(Workshop_ID);
            let data = Object.assign({}, this.state.workshops[index]);
            // Convert parallel arrays from state to objects for neater export
            let student_data = [];
            for (let i = 0; i < this.state.studentsAtWorkshop[index].Students.length; i++) {
                let student = this.state.studentsAtWorkshop[index].Students[i];
                let progress = this.state.studentsAtWorkshop[index].Progress[i];
                student_data.push({
                    student,
                    progress,
                });
            }
            data.Date = new Date(data.Date.seconds * 1000).toDateString();
            // Merging both workshop data and student data into one json object
            let export_data = {
                workshop_data: data,
                student_data: student_data,
            };
            export_data = JSON.stringify(export_data, null, 4);
            // Create a blob with data
            const jsonBlob = new Blob([export_data], {
                type: "application/json;charset=utf-8;",
            });
            // Send to user for download
            file_saver_1.default.saveAs(jsonBlob, `${Workshop_ID}.json`);
        };
        /**
         * Call function to download all workshop data
         */
        this.downloadAllWorkshops = () => {
            let big_data = [];
            // Loop through workshops
            for (let i = 0; i < this.state.workshops.length; i++) {
                let data = Object.assign({}, this.state.workshops[i]);
                let student_data = [];
                // Convert parallel arrays from state to objects for neater export
                for (let k = 0; k < this.state.studentsAtWorkshop[i].Students.length; k++) {
                    let student = this.state.studentsAtWorkshop[i].Students[k];
                    let progress = this.state.studentsAtWorkshop[i].Progress[k];
                    student_data.push({
                        student,
                        progress,
                    });
                }
                data.Date = new Date(data.Date.seconds * 1000).toDateString();
                // Merging both workshop data and student data into one json object that is pushed to the main object
                big_data.push({
                    workshop_data: data,
                    student_data: student_data,
                });
            }
            big_data = JSON.stringify(big_data, null, 4);
            // Create a blob with data
            const jsonBlob = new Blob([big_data], {
                type: "application/json;charset=utf-8;",
            });
            // Send to user for download
            file_saver_1.default.saveAs(jsonBlob, `Workshops.json`);
        };
        /**
         * Opens or closes the workshop editing dialog
         */
        this.showHideAddEditDialog = () => {
            this.setState((state) => ({
                addWorkshopDialogState: !state.addWorkshopDialogState,
            }));
        };
        /**
         * Receives the response from the editing dialog
         * If the submit button was pressed then it calls the function to modify db, else it just closes the dialog
         * @param {*} Workshop_Object
         * @param {*} wasSubmitPressed
         */
        this.receiveAddEditWorkshopInformationFromDialog = (Workshop_Object, wasSubmitPressed) => {
            this.showHideAddEditDialog();
            if (wasSubmitPressed) {
                this.addEditWorkshop(Workshop_Object);
            }
        };
        /**
         * When submit is clicked on the workshop editing dialog this function gets called
         * Will perform some modifications to the data before calling the parent functions from props to update/create in firestore
         * @param {*} Workshop_Object
         */
        this.addEditWorkshop = (Workshop_Object) => {
            let workshopIndex = this.findWorkshopIndex(Workshop_Object.Workshop_ID);
            //the slice commands below ensure that when the workshop is saved then only the correct number of levels are passed back
            //For example if the workshop used to have 5 levels but was edited to only have 4 then the slice commands will remove the extra one
            Workshop_Object.Level_Titles = Workshop_Object.Level_Titles.slice(0, Workshop_Object.Number_Of_Levels);
            Workshop_Object.Level_Descriptions = Workshop_Object.Level_Descriptions.slice(0, Workshop_Object.Number_Of_Levels);
            // if the workshop does not exist then create it else update it
            if (workshopIndex === -1) {
                this.props.createWorkshop(Workshop_Object);
            }
            else {
                this.props.updateWorkshop(Workshop_Object.Workshop_ID, Workshop_Object);
            }
        };
        /**
         * Loop through array to find the index of the workshop
         * @param {*} Workshop_ID
         */
        this.findWorkshopIndex = (Workshop_ID) => {
            let workshopIndex = -1;
            // loops through array looking for the index that contains inforamtion on that specific workshop, saves that index in workshopView state which then will be passed in as props to the <Workshop /> Component
            for (var i = 0; i < this.state.workshops.length; i++) {
                if (this.state.workshops[i].Workshop_ID === Workshop_ID) {
                    workshopIndex = i;
                }
            }
            return workshopIndex;
        };
        /**
         * loops through the student array to find the index of a specific student
         * @param {*} Workshop_ID
         */
        this.findStudentIndex = (Workshop_ID) => {
            var studentIndex = -1;
            for (var i = 0; i < this.state.studentsAtWorkshop.length; i++) {
                if (this.state.studentsAtWorkshop[i].Workshop_ID === Workshop_ID) {
                    studentIndex = i;
                }
            }
            return studentIndex;
        };
        let openDialog = () => {
            this.showHideAddEditDialog();
        };
        let downloadAllWorkshops = () => {
            this.downloadAllWorkshops();
        };
        //more hard coded data here, this is for the texts present in the cards present on the dashboard
        let placeholderFunction = () => {
            console.log("placeholder function triggered");
        };
        //contains the text and functions for the <CardTile />
        let cfirst = {
            title: "Admin",
            subtitle: "Administrative Tools",
            description: "Configuration tool for setting up new workshops",
            links: [downloadAllWorkshops, openDialog],
            linkText: ["Download Workshops", "Add Workshop"],
            disabled: false,
        };
        let csecond = {
            title: "Development",
            subtitle: "Development Tools",
            description: "Try out beta tools for customizing trackit",
            links: [placeholderFunction, placeholderFunction],
            linkText: ["Documentation", "Donate"],
            disabled: true,
        };
        let cthird = {
            title: "Social",
            subtitle: "Media Tools",
            description: "Access resources and social media",
            links: [placeholderFunction, placeholderFunction, placeholderFunction],
            linkText: ["Github", "LinkedIn", "Instagram"],
            disabled: true,
        };
        this.state = {
            workshops: [],
            dataLoaded: false,
            cards: [cfirst, csecond, cthird],
            studentsAtWorkshop: [],
            viewWorkshop: false,
            workshopView: 1,
            addWorkshopDialogState: false,
            alert: false,
            alertText: "Unknown error occurred",
        };
    }
    // if the data updates due to the listeners on the Workshop and StudentsAtWorkshop collection this gets called
    componentDidUpdate(prevProps) {
        if (this.props.student_data !== prevProps.student_data) {
            this.setState({
                studentsAtWorkshop: this.props.student_data,
            });
        }
        if (this.props.workshop_data !== prevProps.workshop_data) {
            this.setState({
                workshops: this.props.workshop_data,
            });
        }
        if (this.props.dataLoaded !== prevProps.dataLoaded) {
            this.setState({
                dataLoaded: this.props.dataLoaded,
            });
        }
        if (this.props.alert !== prevProps.alert) {
            this.setState({
                alert: this.props.alert,
                alertText: this.props.alertText,
            });
        }
    }
    componentDidMount() {
        this.props.readWorkshopData();
        this.props.readStudentData();
    }
    // remove the progress listeners if the page crashes or the user signs out
    componentWillUnmount() {
        if (this.props.progressListener) {
            this.props.progressListener();
        }
        if (this.props.workshopListener) {
            this.props.workshopListener();
        }
    }
    render() {
        //maps out the array into UI components, this is for the admin page that shows all workshops which is why expandState is set to false
        let workshopList = this.state.workshops.map((item, index) => (react_1.default.createElement(WorkshopBar_1.default, { expandState: false, expandWindow: this.openWorkshopWindow, data: item, students: this.state.studentsAtWorkshop[index], key: index })));
        //maps out the array into UI components to be displayed in the tiles at the top
        let tiles = this.state.cards.map((item, index) => (react_1.default.createElement(react_bootstrap_1.Col, { key: index },
            react_1.default.createElement(CardTile_1.default, { data: item }))));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(NavBar_1.default, { dashboard: true, signOut: this.props.signOut }),
            react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
                this.state.alert ? (react_1.default.createElement("div", { className: "m-1 mt-3 m-lg-5" },
                    react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", onClose: () => this.props.resetAlertStatus(), dismissible: true }, this.state.alertText))) : (""),
                !this.state.dataLoaded ? (react_1.default.createElement(Loading_1.default, null)) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "m-1 mt-3 m-lg-5" },
                        react_1.default.createElement(react_bootstrap_1.Row, null, tiles)),
                    react_1.default.createElement("div", { className: "m-1 mb-4 m-lg-5" }, this.state.viewWorkshop ? (react_1.default.createElement("div", null,
                        react_1.default.createElement(WorkshopBar_1.default, { expandState: true, expandWindow: this.openWorkshopWindow, data: this.state.workshops[this.state.workshopView], students: this.state.studentsAtWorkshop[this.state.workshopView] }),
                        react_1.default.createElement(Workshop_1.default, { incrementLevel: this.incrementLevel, decrementLevel: this.decrementLevel, enableWorkshop: this.enableWorkshop, disableWorkshop: this.disableWorkshop, clearAllStudents: this.clearAllStudents, deleteWorkshop: this.deleteWorkshop, addEditWorkshop: this.addEditWorkshop, exportWorkshop: this.exportWorkshop, properties: this.state.workshops[this.state.workshopView], data: this.state.studentsAtWorkshop[this.state.workshopView] }))) : (workshopList)),
                    react_1.default.createElement(WorkshopEdit_1.default, { isOpen: this.state.addWorkshopDialogState, titleText: "Workshop Panel", messageText: "Add workshop information below", submit: this.receiveAddEditWorkshopInformationFromDialog, newWorkshop: true }))))));
    }
}
exports.default = AdminDashboard;
//# sourceMappingURL=AdminDashboard.js.map