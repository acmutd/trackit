"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const Add_1 = require("@material-ui/icons/Add");
const Remove_1 = require("@material-ui/icons/Remove");
const react_datepicker_1 = require("react-datepicker");
const WorkshopEditor_1 = require("../Layout/WorkshopEditor");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * Opens up a dialog modal for the workshop data to be edited or a new workshop informatin to be added
 * Pretty important because this is where all the crud operations take place for a given workshop
 * The same dialog will be used for both when a new workshop needs to be added and for when a workshop needs to be edited
 * Intially the state is set to null and only gets updated when the textFields are changed
 * If a workshop is being edited then that workshop information is passed in as props
 */
class WorkshopEdit extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Workshop: {
                Workshop_ID: null,
                Workshop_Name: null,
                Level_Titles: [null],
                Level_Descriptions: [null],
                Number_Of_Levels: 1,
                Date: null,
            },
            editWindow: false,
            currLevel: -1,
            hasBeenEdited: false,
            alertText: "Workshop has been modified, submit to save changes",
        };
        /**
         * A temporary copy is created because the object is being passed by reference
         * We want to clone it to ensure that changes here are not always directly saved
         * Called by the dialog
         */
        this.initializeState = () => {
            //if it is null then a new workshop is being created else an existing  one is being updated
            if (this.props.workshop != null) {
                let temp = new Date(this.props.workshop.Date.seconds * 1000);
                let tempX = Object.assign(Object.assign({}, this.props.workshop), { Date: temp });
                this.setState({
                    Workshop: tempX,
                });
            }
        };
        /**
         * This gets called when someone clicks cancel or outside the dialog box
         * Returns an empty workshop object and false for whether the submit button was pressed
         */
        this.cancel = () => {
            this.setState({
                Workshop: {
                    Workshop_ID: null,
                    Workshop_Name: null,
                    Level_Titles: [null],
                    Level_Descriptions: [null],
                    Number_Of_Levels: 1,
                    Date: null,
                },
                hasBeenEdited: false,
            });
            this.props.submit(this.state.Workshop, false);
        };
        /**
         * This gets called when the submit button is pressed to save changes made to a workshop or save a new workshop
         */
        this.submit = () => {
            if (this.state.Workshop.Date === null) {
                this.setState({
                    hasBeenEdited: true,
                    alertText: "Date field cannot be null",
                });
            }
            else if (this.state.Workshop.Workshop_ID === null) {
                this.setState({
                    hasBeenEdited: true,
                    alertText: "Workshop title cannot be null",
                });
            }
            else {
                console.log(this.state.Workshop);
                this.props.submit(this.state.Workshop, true);
                //sets to null to prepare for the next time the component may get used
                this.setState({
                    Workshop: {
                        Workshop_ID: null,
                        Workshop_Name: null,
                        Level_Titles: [null],
                        Level_Descriptions: [null],
                        Number_Of_Levels: 1,
                        Date: null,
                    },
                    hasBeenEdited: false,
                });
            }
        };
        /**
         * Links button to function passed in as props
         */
        this.callPropsSubmit = () => {
            this.props.submit(this.state.Workshop, true);
        };
        /**
         * Updates state with additional level
         */
        this.incrementLevel = () => {
            let workshop = this.state.Workshop;
            workshop.Number_Of_Levels = workshop.Number_Of_Levels + 1;
            this.setState({ Workshop: workshop, hasBeenEdited: true });
        };
        /**
         * Updates state with reduced level
         */
        this.decrementLevel = () => {
            if (this.state.Workshop.Number_Of_Levels > 1) {
                let workshop = this.state.Workshop;
                workshop.Number_Of_Levels = workshop.Number_Of_Levels - 1;
                this.setState({ Workshop: workshop, hasBeenEdited: true });
            }
        };
        /**
         * Event handler for workshop name, note: workshop name is a primary key and changing it is not allowed if a workshop has already been created
         * @param {*} event
         */
        this.setWorkshopName = (event) => {
            let temp = event.target.value;
            this.setState((state) => ({
                Workshop: Object.assign(Object.assign({}, state.Workshop), { Workshop_ID: temp, Workshop_Name: temp }),
                hasBeenEdited: true,
            }));
        };
        /**
         * Event handler for the level name, was tricky using the same event handler for all level names but it works like a charm
         * @param {*} event
         */
        this.setWorkshopLevelName = (event) => {
            let temp = event.target.id;
            let tempArray = this.state.Workshop.Level_Titles;
            for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
                if (temp === i + "") {
                    tempArray[i] = event.target.value;
                }
            }
            this.setState((state) => ({
                Workshop: Object.assign(Object.assign({}, state.Workshop), { Level_Titles: tempArray }),
                hasBeenEdited: true,
            }));
        };
        /**
         * Event handler for the level description
         * @param {*} event
         */
        this.setWorkshopLevelDescription = (newText) => {
            let tempArray = this.state.Workshop.Level_Descriptions;
            tempArray[this.state.currLevel] = newText;
            this.setState((state) => ({
                Workshop: Object.assign(Object.assign({}, state.Workshop), { Level_Descriptions: tempArray }),
                hasBeenEdited: true,
            }));
        };
        this.openWorkshopEdit = (level) => {
            this.setState({
                editWindow: true,
                currLevel: level,
                hasBeenEdited: true,
            });
        };
        /**
         * Event listener
         */
        this.setWorkshopDate = (date) => {
            let d = new Date(date);
            this.setState((state) => ({
                Workshop: Object.assign(Object.assign({}, state.Workshop), { Date: d }),
                hasBeenEdited: true,
            }));
        };
        this.closeWorkshopEdit = (newText) => {
            if (newText)
                this.setWorkshopLevelDescription(newText);
            this.setState({
                editWindow: false,
                hasBeenEdited: true,
            });
        };
    }
    render() {
        if (this.state.editWindow) {
            return (react_1.default.createElement(core_1.Dialog, { open: this.props.isOpen, onClose: this.cancel, onEnter: this.initializeState, maxWidth: "xl", "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                react_1.default.createElement(core_1.DialogContent, null,
                    react_1.default.createElement(WorkshopEditor_1.default, { closeWindow: this.closeWorkshopEdit, content: this.state.Workshop.Level_Descriptions[this.state.currLevel] }))));
        }
        //the following code generates the appropriate number of textFields to be filled in based on Number_Of_Levels
        //level text fields have the id set to 0,1,2,3... etc which is used by the event handler to decide what to modify
        //level description fields have the id set to 0-level,1-level,2-level... etc which is used by the event handler
        let lvlTitl = [];
        let lvlDesc = [];
        for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
            lvlTitl.push(i + "");
            lvlDesc.push(i + "-level");
        }
        let lvlTitleFields = lvlTitl.map((item, i) => (react_1.default.createElement(core_1.DialogContent, { key: i },
            react_1.default.createElement("form", null,
                react_1.default.createElement(react_bootstrap_1.Row, null,
                    react_1.default.createElement(react_bootstrap_1.Col, null,
                        react_1.default.createElement(core_1.TextField, { required: true, id: item, label: "Level Name", helperText: "Enter Level Name", placeholder: "Level Name", className: "mr-5", onChange: (event) => this.setWorkshopLevelName(event), value: this.state.Workshop.Level_Titles[i] || "" })),
                    react_1.default.createElement(react_bootstrap_1.Col, null,
                        react_1.default.createElement(core_1.Button, { type: "button", label: "Level Description", className: "mr-5", onClick: () => {
                                this.openWorkshopEdit(i);
                            } }, "Edit Level Info")))))));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.Dialog, { open: this.props.isOpen, onClose: this.cancel, onEnter: this.initializeState, maxWidth: "xl", "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                react_1.default.createElement(core_1.DialogContent, null, this.state.hasBeenEdited ? (react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", onClose: () => this.setState({ hasBeenEdited: false }) }, this.state.alertText)) : ("")),
                react_1.default.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, this.props.titleText),
                react_1.default.createElement(core_1.DialogContent, null,
                    react_1.default.createElement(core_1.DialogContentText, { id: "alert-dialog-description" }, this.props.messageText)),
                react_1.default.createElement(core_1.DialogContent, null,
                    react_1.default.createElement("form", null,
                        react_1.default.createElement(core_1.TextField, { required: true, id: "workshop-title", label: "Title", helperText: "Enter title of Workshop", placeholder: "Workshop Name", className: "mr-5", onChange: (event) => this.setWorkshopName(event), value: this.state.Workshop.Workshop_Name || "", disabled: !this.props.newWorkshop }),
                        "Workshop_Levels:" + this.state.Workshop.Number_Of_Levels,
                        react_1.default.createElement(core_1.Fab, { color: "primary", "aria-label": "remove", className: "ml-5 mr-2" },
                            react_1.default.createElement(Remove_1.default, { onClick: () => this.decrementLevel() })),
                        react_1.default.createElement(core_1.Fab, { color: "primary", "aria-label": "add", className: "ml-2 mr-2" },
                            react_1.default.createElement(Add_1.default, { onClick: () => this.incrementLevel() })))),
                lvlTitleFields,
                react_1.default.createElement(core_1.DialogContent, null,
                    react_1.default.createElement("form", { className: "mt-4" },
                        react_1.default.createElement("p", null, "Workshop Date: "),
                        react_1.default.createElement(react_datepicker_1.default, { selected: this.state.Workshop.Date, onChange: (date) => this.setWorkshopDate(date), name: "startDate", dateFormat: "MM/dd/yyyy", placeholderText: "Select Date" }))),
                react_1.default.createElement(core_1.DialogActions, null,
                    react_1.default.createElement(core_1.Button, { onClick: this.cancel, color: "primary" }, "Cancel"),
                    react_1.default.createElement(core_1.Button, { onClick: this.submit, color: "secondary", autoFocus: true }, "Submit")))));
    }
}
exports.default = WorkshopEdit;
//# sourceMappingURL=WorkshopEdit.js.map