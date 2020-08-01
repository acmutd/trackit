import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DatePicker from "react-datepicker";
import WorksdopEditor from "../Layout/WorkshopEditor";
import { Row, Col, Alert } from "react-bootstrap";
import { workshop, DateType } from "../../config/interface"
import storage from "../../config/firebase";
/**
 * Opens up a dialog modal for the workshop data to be edited or a new workshop informatin to be added
 * Pretty important because this is where all the crud operations take place for a given workshop
 * The same dialog will be used for both when a new workshop needs to be added and for when a workshop needs to be edited
 * Intially the state is set to null and only gets updated when the textFields are changed
 * If a workshop is being edited then that workshop information is passed in as props
 */

interface WorkshopEditState {
  Workshop: workshop;
  editWindow: boolean;
  currLevel: number;
  hasBeenEdited: boolean;
  alertText: string;
  Files: Array<Array<File>>;
}

interface WorkshopEditProps {
  workshop?: workshop;
  submit: Function;
  isOpen: boolean;
  titleText: string;
  messageText: string;
  newWorkshop: boolean;
}

interface workshopEditorReturn {
  content: string; //html text
  file: any; //uploaded files
}

class WorkshopEdit extends React.Component<WorkshopEditProps, WorkshopEditState> {
  state: WorkshopEditState = {
    Workshop: {
      Workshop_ID: "",
      Workshop_Name: "",
      Level_Titles: [],
      Level_Descriptions: [],
      Number_Of_Levels: 1,
      Date: new Date(),
      Files: [],
    },
    editWindow: false,
    currLevel: -1,
    hasBeenEdited: false,
    alertText: "Workshop has been modified, submit to save changes",
    Files: [],
  };

  /**
   * A temporary copy is created because the object is being passed by reference
   * We want to clone it to ensure that changes here are not always directly saved
   * Called by the dialog
   */
  initializeState = () => {
    //if it is null then a new workshop is being created else an existing  one is being updated
    if (this.props.workshop != null) {
      let temp = new Date(this.props.workshop.Date.seconds as number * 1000);
      let tempX = {
        ...this.props.workshop, //creates deep copy
        Date: temp,
      };
      if (this.props.workshop.Files === undefined) {
        console.log(this.state.Workshop.Files)
        if (this.state.Workshop.Files?.length !== this.props.workshop.Number_Of_Levels) {
          tempX.Files = [...Array(this.props.workshop.Number_Of_Levels)].map((e) => Array());
          console.log('initiaslizing')
          this.setState({
            Files: [...Array(this.props.workshop.Number_Of_Levels)].map((e) => Array()),
          })
        }
        else tempX.Files = this.state.Workshop.Files;
      } 
      this.setState({
        Workshop: tempX,
      });
    }
  };

  /**
   * This gets called when someone clicks cancel or outside the dialog box
   * Returns an empty workshop object and false for whether the submit button was pressed
   */
  cancel = () => {
    this.setState({
      Workshop: {
        Workshop_ID: "",
        Workshop_Name: "",
        Level_Titles: [],
        Level_Descriptions: [],
        Number_Of_Levels: 1,
        Date: new Date(),
        Files: [],
      },
      hasBeenEdited: false,
    });
    this.props.submit(this.state.Workshop, false);
  };

  /**
   * This gets called when the submit button is pressed to save changes made to a workshop or save a new workshop
   */
  submit = () => {
    if (this.state.Workshop.Date === null) {
      this.setState({
        hasBeenEdited: true,
        alertText: "Date field cannot be null",
      });
    } else if (this.state.Workshop.Workshop_ID === null) {
      this.setState({
        hasBeenEdited: true,
        alertText: "Workshop title cannot be null",
      });
    } else {
      this.uploadContent();
      console.log(this.state.Workshop);
      this.props.submit(this.state.Workshop, true);
      //sets to null to prepare for the next time the component may get used
      this.setState({
        Workshop: {
          Workshop_ID: "",
          Workshop_Name: "",
          Level_Titles: [],
          Level_Descriptions: [],
          Number_Of_Levels: 1,
          Date: new Date(),
          Files: [],
        },
        hasBeenEdited: false,
      });
    }
  };

  /**
   * Links button to function passed in as props
   */
  callPropsSubmit = () => {
    this.props.submit(this.state.Workshop, true);
  };

  /**
   * Updates state with additional level
   */
  incrementLevel = () => {
    let workshop = this.state.Workshop;
    workshop.Number_Of_Levels = workshop.Number_Of_Levels + 1;
    this.setState({ Workshop: workshop, hasBeenEdited: true });
  };

  /**
   * Updates state with reduced level
   */
  decrementLevel = () => {
    if (this.state.Workshop.Number_Of_Levels > 1) {
      let workshop = this.state.Workshop;
      workshop.Number_Of_Levels = workshop.Number_Of_Levels - 1;
      this.setState({ Workshop: workshop, hasBeenEdited: true });
    }
  };

  /**
   * Event handler for workshop name, note: workshop name is a primary key and changing it is not allowed if a workshop has already been created
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  setWorkshopName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let temp = event.target.value;
    this.setState((state) => ({
      Workshop: {
        ...state.Workshop,
        Workshop_ID: temp,
        Workshop_Name: temp,
      },
      hasBeenEdited: true,
    }));
  };

  /**
   * Event handler for the level name, was tricky using the same event handler for all level names but it works like a charm
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  setWorkshopLevelName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let temp = event.target.id;
    let tempArray = this.state.Workshop.Level_Titles;
    for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
      if (temp === i + "") {
        tempArray[i] = event.target.value;
      }
    }

    this.setState((state) => ({
      Workshop: {
        ...state.Workshop,
        Level_Titles: tempArray,
      },
      hasBeenEdited: true,
    }));
  };

  /**
   * Event handler for the level description
   * @param {string} event
   */
  setWorkshopLevelDescription = (newText: string) => {
    console.log('workshop desc ' + this.state.currLevel)
    let tempArray = this.state.Workshop.Level_Descriptions;
    tempArray[this.state.currLevel] = newText;

    this.setState((state) => ({
      Workshop: {
        ...state.Workshop,
        Level_Descriptions: tempArray,
      },
      hasBeenEdited: true,
    }));
  };

  /**
   * 
   * Files = [[level1],[level2],  ]
   */

  setWorkshopFiles = (files: any[]) => {
    console.log('files')
    console.log(files)
    if (files.length === 0) return;
    let tempArray = this.state.Workshop.Files;
    let fileArr: string[];
    if(tempArray !== undefined)
      fileArr = tempArray[this.state.currLevel];
    let tempFileArr = this.state.Files;
    files.forEach((element: any) => {
      if (element !== null && !fileArr.includes(element.name)) {
        tempFileArr[this.state.currLevel].push(element);
        fileArr.push(element.name);
        console.log('added element')
      }
    });
    tempArray[this.state.currLevel] = fileArr;
    console.log(tempArray)
    this.setState(
      (state) => ({
        Workshop: {
          ...state.Workshop,
          Files: tempArray,
        },
        Files: tempFileArr,
        hasBeenEdited: true,
      }),
      () => console.log(this.state.Workshop)
    );
  };
  /**
   * Opens the editing panel for a specific workshop
   * @param {number} level
   */
  openWorkshopEdit = (level: number) => {
    this.setState({
      editWindow: true,
      currLevel: level,
      hasBeenEdited: true,
    });
  };

  /**
   * Event listener
   */
  setWorkshopDate = (date: DateType) => {
    let d = new Date(date);
    this.setState((state) => ({
      Workshop: {
        ...state.Workshop,
        Date: d,
      },
      hasBeenEdited: true,
    }));
  };



  /**
   * @param {string} newText
   */
  closeWorkshopEdit = (data: workshopEditorReturn) => {
    if (data.content) this.setWorkshopLevelDescription(data.content);
    if (data.file) {
      this.setWorkshopFiles(data.file);
    }
    this.setState({
      editWindow: false,
      hasBeenEdited: true,
    });
  };

  uploadContent = () => {
    console.log('uploading file2')
    var tempArr = this.state.Workshop.Files;
    this.state.Files.forEach((arr, index) => {
      arr.forEach((file) => {
        if (!this.uploadFile(file)) {
          var val = tempArr[index].indexOf(file.name);
          tempArr[index].splice(val, 1);
        }
      });
    })
  };

  uploadFile = async (file: any) => {
    await storage
      .storage()
      .ref()
      .child(this.state.Workshop.Workshop_ID + "/" + file.name)
      .put(file)
      .then(() => {
        return true;
      })
      .catch((err: any) => {
        console.log(err);
        return false;
      });
      return false;
  }

  render() {
    console.log('render files')
    console.log(this.state.Workshop.Files)
    if (this.state.editWindow) {
      return (
        <Dialog
          open={this.props.isOpen}
          onClose={this.cancel}
          onEnter={this.initializeState}
          maxWidth="xl"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <WorksdopEditor
              closeWindow={this.closeWorkshopEdit}
              content={
                this.state.Workshop.Level_Descriptions[this.state.currLevel]
              }
            />
          </DialogContent>
        </Dialog>
      );
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
    let lvlTitleFields = lvlTitl.map((item, index) => (
      <DialogContent key={index}>
        <form>
          <Row>
            <Col>
              <TextField
                required
                id={item}
                label="Level Name"
                helperText="Enter Level Name"
                placeholder="Level Name"
                className="mr-5"
                onChange={(event) => this.setWorkshopLevelName(event)}
                value={this.state.Workshop.Level_Titles[index] || ""}
              />
            </Col>
            <Col>
              <Button
                className="mr-5"
                onClick={() => {
                  this.openWorkshopEdit(index);
                }}
              >
                Edit Level Info
              </Button>
            </Col>
          </Row>
        </form>
      </DialogContent>
    ));

    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.cancel}
          onEnter={this.initializeState}
          maxWidth="xl"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {this.state.hasBeenEdited ? (
              <Alert
                variant="danger"
                onClose={() => this.setState({ hasBeenEdited: false })}
              >
                {this.state.alertText}
              </Alert>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogTitle id="alert-dialog-title">
            {this.props.titleText}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.messageText}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <form>
              <TextField
                required
                id="workshop-title"
                label="Title"
                helperText="Enter title of Workshop"
                placeholder="Workshop Name"
                className="mr-5"
                onChange={(event) => this.setWorkshopName(event)}
                value={this.state.Workshop.Workshop_Name || ""}
                disabled={!this.props.newWorkshop}
              />
              {"Workshop_Levels:" + this.state.Workshop.Number_Of_Levels}
              <Fab color="primary" aria-label="remove" className="ml-5 mr-2">
                <RemoveIcon onClick={() => this.decrementLevel()} />
              </Fab>
              <Fab color="primary" aria-label="add" className="ml-2 mr-2">
                <AddIcon onClick={() => this.incrementLevel()} />
              </Fab>
            </form>
          </DialogContent>
          {/* Dynamically add in required number of text fields based on the number of levels */}
          {lvlTitleFields}

          {/* This date field needs to be made prettier */}
          <DialogContent>
            <form className="mt-4">
              <p>Workshop Date: </p>
              <DatePicker
                selected={this.state.Workshop.Date}
                onChange={(date) => this.setWorkshopDate(date as Date)} //it could have been Date | null
                name="startDate"
                dateFormat="MM/dd/yyyy"
                placeholderText="Select Date"
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="secondary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WorkshopEdit;
