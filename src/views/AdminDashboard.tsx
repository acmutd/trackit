import * as React from "react";
import WorkshopBar from "../components/Workshop/WorkshopBar";
import NavBar from "../components/Layout/NavBar";
import Workshop from "../components/Workshop/Workshop";
import WorkshopEdit from "../components/Workshop/WorkshopEdit";
import CardTile from "../components/Workshop/CardTile";
import Loading from "../components/Layout/Loading";
import { Row, Col, Container, Alert } from "react-bootstrap";
import {
  workshop,
  studentsAtWorkshop,
  CardData,
  studentsAtWorkshopFirebase,
  workshopFirebase,
} from "../config/interface";
import * as FileSaver from "file-saver";
import app from "../config/firebase";
import { groupCollapsed } from "console";

interface AdminDashboardProps {
  signOut(): void;
}

interface AdminDashboardState {
  workshops: workshop[];
  cards: CardData[];
  studentsAtWorkshop: studentsAtWorkshop[];
  viewWorkshop: boolean;
  workshopView: number;
  addWorkshopDialogState: boolean;
  alert: boolean;
  alertText: string;
  workshopsLoaded: boolean;
  studentsLoaded: boolean;
}

/**
 * UI component that manages how the admin dashboard looks like
 *
 */
class AdminDashboard extends React.Component<AdminDashboardProps, AdminDashboardState> {
  constructor(props: AdminDashboardProps) {
    super(props);

    const openDialog = () => {
      this.showHideAddEditDialog();
    };

    const downloadAllWorkshops = () => {
      this.downloadAllWorkshops();
    };

    //more hard coded data here, this is for the texts present in the cards present on the dashboard
    const placeholderFunction = () => {
      console.log("placeholder function triggered");
    };

    //contains the text and functions for the <CardTile />
    const cfirst = {
      title: "Admin",
      subtitle: "Administrative Tools",
      description: "Configuration tool for setting up new workshops",
      links: [downloadAllWorkshops, openDialog], //functions
      linkText: ["Download Workshops", "Add Workshop"],
      disabled: false,
    };

    const csecond = {
      title: "Development",
      subtitle: "Development Tools",
      description: "Try out beta tools for customizing trackit",
      links: [placeholderFunction, placeholderFunction], //functions
      linkText: ["Documentation", "Donate"],
      disabled: true,
    };

    const githubRedirect = () => {
      window.location.href = "https://github.com/acmutd/TrackIT";
    };

    const cthird = {
      title: "Social",
      subtitle: "Media Tools",
      description: "Access resources and social media",
      links: [githubRedirect, placeholderFunction, placeholderFunction], //functions
      linkText: ["Github", "LinkedIn", "Instagram"],
      disabled: true,
    };

    this.state = {
      workshops: [],
      cards: [cfirst, csecond, cthird],
      studentsAtWorkshop: [],
      viewWorkshop: false, //determines whether the expanded view is open or not
      workshopView: 1, //this determines the index of the workshop which has the expanded view
      addWorkshopDialogState: false, //determines whether the editing dialog is open or not
      alert: false,
      alertText: "Unknown error occurred",
      workshopsLoaded: false,
      studentsLoaded: false,
    };
  }

  progressListener?: firebase.Unsubscribe;
  workshopListener?: firebase.Unsubscribe;

  componentDidMount(): void {
    this.readWorkshopData();
    this.readStudentData();
  }

  // remove the progress listeners if the page crashes or the user signs out
  componentWillUnmount(): void {
    if (this.progressListener) {
      this.progressListener();
    }
    if (this.workshopListener) {
      this.workshopListener();
    }
  }

  /**
   * Read workshop data from Workshops collection on firestore
   * Sets listener to see if any updates are being made
   * Calls readStudentData once it has finished reading the workshop data
   */

  readWorkshopData = async () => {
    const groups = await app
      .auth()
      .currentUser?.getIdTokenResult()
      .then((token: any) => {
        return token.claims.Groups;
      })
      .catch((err: any) => {
        return [""];
      });
    //set listener for updates
    this.workshopListener = app
      .firestore()
      .collection("NewWorkshop")
      .where("Owner", "in", groups)
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        const arr: workshop[] = [];
        //save each workshop into an array
        snapshot.forEach((snap: workshopFirebase) => {
          const workshopObject: workshop = {
            Date: snap.data()?.Date,
            Number_Of_Levels: snap.data()?.Number_Of_Levels,
            Workshop_ID: snap.data()?.Workshop_ID,
            Workshop_Name: snap.data()?.Workshop_Name,
            Levels: snap.data()?.Levels,
            Owner: snap.data()?.Owner,
          };
          arr.push(workshopObject);
        });
        //save array in state
        this.setState({
          workshops: arr,
          workshopsLoaded: true,
        });
      });
  };

  /**
   * Reads Student progress information from StudentsAtWorkshop collection on firestore
   * Sets listener to monitor for updates
   */

  readStudentData = async (): Promise<void> => {
    const groups = await app
      .auth()
      .currentUser?.getIdTokenResult()
      .then((token: any) => {
        return token.claims.Groups;
      })
      .catch((err: any) => {
        return [""];
      });
    this.progressListener = app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .where("Owner", "in", groups)
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        const arr: studentsAtWorkshop[] = [];
        snapshot.forEach((snap: studentsAtWorkshopFirebase) => {
          //split map into two parallel arrays for easy use in front-end
          const students = [];
          const progress = [];
          for (const x in snap.data().testProgress) {
            const user = decodeURIComponent(x).replace("%2E", ".");
            students.push(user);
            progress.push(snap.data().testProgress[x]);
          }

          const studentsObject: studentsAtWorkshop = {
            Students: students,
            Progress: progress,
            Enabled: snap.data().Enabled,
            Workshop_ID: snap.data().Workshop_ID,
            Level_Enabled: snap.data().Level_Enabled,
          };
          arr.push(studentsObject);
        });

        //save data in state
        this.setState({
          studentsAtWorkshop: arr,
          studentsLoaded: true,
        });
      });
  };

  /**
   * If workshop level gets incremented or decremented this function gets called to update Level_Enabled on firestore
   * @param {string} workshopID
   * @param {number} level
   */
  updateWorkshopLevel = (workshopID: string, level: number): void => {
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopID)
      .update({
        Level_Enabled: level,
      })
      .then(() => {
        console.log("workshop level successfully updated");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop level",
        });
        console.log({
          error: error,
          message: "Error occurred in udpating workshop level",
        });
      });
  };

  /**
   * If workshop gets toggled between Enabled/Disabled this function gets called to update in firestore
   * @param {string} workshopID
   * @param {number} status
   */
  updateWorkshopStatus = (workshopID: string, status: boolean): void => {
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopID)
      .update({
        Enabled: status,
      })
      .then(() => {
        console.log("workshop status successfully updated");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop status",
        });
        console.log({
          error: error,
          message: "Error occurred in updating workshop status",
        });
      });
  };

  /**
   * map<student, progress> on firestore gets cleared when this function gets called
   * All students signed in for a given workshop have their progress erased and removed
   * @param {string} workshopID
   */
  clearStudentsAtWorkshop = (workshopID: string): void => {
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopID)
      .update({
        testProgress: {},
      })
      .then(() => {
        console.log("All student progress successfully cleared");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in erasing student progress",
        });
        console.log({
          error: error,
          message: "Error occurred in erasing student progress",
        });
      });
  };

  /**
   * When a workshop gets updated, all fields saved on firestore get overwritten by the new edits
   * @param {*} workshopID
   * @param {*} workshopObject
   */
  updateWorkshop = (workshopID: string, workshopObject: workshop): void => {
    app
      .firestore()
      .collection("NewWorkshop")
      .doc(workshopID)
      .set({
        Date: workshopObject.Date,
        Levels: workshopObject.Levels,
        Number_Of_Levels: workshopObject.Number_Of_Levels,
        Workshop_Name: workshopObject.Workshop_Name,
        Workshop_ID: workshopObject.Workshop_ID,
      })
      .then(() => {
        console.log("updating workshop successful");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in updating workshop",
        });
        console.log({
          error: error,
          message: "Error occurred in updating workshop",
        });
      });

    // when a workshop gets updated, its progress gets reset to 1
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopID)
      .update({
        Level_Enabled: 1,
      })
      .then(() => {
        console.log("workshop level successfully reset to 1");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in reseting workshop level to 1",
        });
        console.log({
          error: error,
          message: "Error occurred in reseting workshop level to 1",
        });
      });
  };

  /**
   * creates a new workshop in Workshop collection on firestore
   * Should fail if a workshop already exists with the same name
   * @param {*} workshopObject
   */
  createNewWorkshop = async (workshopObject: workshop): Promise<void> => {
    //creates a blank object for the number of students in a workshop
    //this happens first to avoid issues due to the async nature of the JS listener
    const groups = await app
      .auth()
      .currentUser?.getIdTokenResult()
      .then((token: any) => {
        return token.claims.Groups;
      })
      .catch((err: any) => {
        this.setState({
          alert: true,
          alertText: "Error occurred in adding new workshop to group.",
        });
        return "";
      });

    const tempStudentWorkshop = {
      Workshop_ID: workshopObject.Workshop_ID,
      Enabled: false,
      Level_Enabled: 1,
      testProgress: {},
      Owner: groups[0],
    };
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopObject.Workshop_ID)
      .set(tempStudentWorkshop)
      .then(() => {
        console.log("empty students at workshop entry created");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in adding empty students at workshop object",
        });
        console.log({
          error: error,
          message: "Error occurred in adding empty students at workshop object",
        });
      });

    //creates the new workshop here
    workshopObject.Owner = groups[0];
    app
      .firestore()
      .collection("NewWorkshop")
      .doc(workshopObject.Workshop_ID)
      .set(workshopObject)
      .then(() => {
        console.log("new workshop created");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in creating new workshop",
        });
        console.log({
          error: error,
          message: "Error occurred in creating new workshop",
        });
      });
  };

  /**
   * deletes a workshop from both the workshop and the studentsAtworkshop collection
   * @param {string} workshopID
   */
  deleteWorkshopFirebase = (workshopID: string): void => {
    app
      .firestore()
      .collection("StudentsAtWorkshopNew")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("successfully deleted students at workshop");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in deleting students at workshop",
        });
        console.log({
          error: error,
          message: "Error occurred in deleting students at workshop",
        });
      });

    app
      .firestore()
      .collection("NewWorkshop")
      .doc(workshopID)
      .delete()
      .then(() => {
        console.log("successfully deleted workshop");
      })
      .catch((error: firebase.firestore.FirestoreError) => {
        this.setState({
          alert: true,
          alertText: error + " Error occurred in deleting workshop",
        });
        console.log({
          error: error,
          message: "Error occurred in deleting workshop",
        });
      });
  };

  /**
   * Changes the viewWorkshop state to true/false, this function is passed in as props to the <WorkshopBar /> Component which will return the its respective Workshop_ID back as param
   *
   * @param {string} Workshop_ID is the name of the workshop that needs to be expanded, received from <WorkshopBar /> Component
   */

  openWorkshopWindow = (Workshop_ID: string): void => {
    const workshopIndex = this.findWorkshopIndex(Workshop_ID);
    this.setState((state) => ({
      viewWorkshop: !state.viewWorkshop,
      workshopView: workshopIndex,
    }));
  };

  /**
   * Call function to access firestore from props
   * @param {string} Workshop_ID
   */
  enableWorkshop = (Workshop_ID: string): void => {
    this.updateWorkshopStatus(Workshop_ID, true);
  };

  /**
   * Call function to access firestore from props
   * @param {string} Workshop_ID
   */
  disableWorkshop = (Workshop_ID: string): void => {
    this.updateWorkshopStatus(Workshop_ID, false);
  };

  /**
   * Call function to access firestore from props
   * @param {string} Workshop_ID
   */
  clearAllStudents = (Workshop_ID: string): void => {
    this.clearStudentsAtWorkshop(Workshop_ID);
  };

  /**
   * Call function to access firestore from props
   * @param {string} Workshop_ID
   */
  deleteWorkshop = (Workshop_ID: string): void => {
    const workshopIndex: number = this.findWorkshopIndex(Workshop_ID);
    const workshopArray = this.state.workshops;
    //removes the one workshop element from the array locally before removing from db
    //avoids unexpected read errors due to progress listeners
    workshopArray.splice(workshopIndex, 1);
    this.setState(
      {
        viewWorkshop: false, //closes the respective workshop view before deletion
        workshops: workshopArray,
      },
      function (this: AdminDashboard) {
        this.deleteWorkshopFirebase(Workshop_ID);
      }
    );
  };

  /**
   * Call function to access firestore from props
   * @param {*} Workshop_ID
   */
  incrementLevel = (Workshop_ID: string): void => {
    const workshopIndex: number = this.findWorkshopIndex(Workshop_ID);
    this.updateWorkshopLevel(Workshop_ID, this.state.studentsAtWorkshop[workshopIndex].Level_Enabled + 1);
  };

  /**
   * Call function to access firestore from props
   * @param {*} Workshop_ID
   */
  decrementLevel = (Workshop_ID: string): void => {
    const workshopIndex: number = this.findWorkshopIndex(Workshop_ID);
    this.updateWorkshopLevel(Workshop_ID, this.state.studentsAtWorkshop[workshopIndex].Level_Enabled - 1);
  };

  /**
   * Call function to access firestore from props
   * @param {*} Workshop_ID
   */
  exportWorkshop = (Workshop_ID: string): void => {
    const index = this.findWorkshopIndex(Workshop_ID);
    const data = { ...this.state.workshops[index] };

    // Convert parallel arrays from state to objects for neater export
    const student_data = [];
    for (let i = 0; i < this.state.studentsAtWorkshop[index].Students.length; i++) {
      const student = this.state.studentsAtWorkshop[index].Students[i];
      const progress = this.state.studentsAtWorkshop[index].Progress[i];
      student_data.push({
        student,
        progress,
      });
    }

    //sets the date object as a string
    const newObject = {
      ...data,
      Date: new Date((data.Date.seconds as number) * 1000).toDateString(),
    };

    // Merging both workshop data and student data into one json object
    const export_data = {
      workshop_data: newObject,
      student_data: student_data,
    };
    const export_data_2 = JSON.stringify(export_data, null, 4);

    // Create a blob with data
    const jsonBlob = new Blob([export_data_2], {
      type: "application/json;charset=utf-8;",
    });

    // Send to user for download
    FileSaver.saveAs(jsonBlob, `${Workshop_ID}.json`);
  };

  /**
   * Call function to download all workshop data
   */
  downloadAllWorkshops = (): void => {
    const big_data = [];

    // Loop through workshops
    for (let i = 0; i < this.state.workshops.length; i++) {
      const data = { ...this.state.workshops[i] };

      const student_data = [];
      // Convert parallel arrays from state to objects for neater export
      for (let k = 0; k < this.state.studentsAtWorkshop[i].Students.length; k++) {
        const student = this.state.studentsAtWorkshop[i].Students[k];
        const progress = this.state.studentsAtWorkshop[i].Progress[k];
        student_data.push({
          student,
          progress,
        });
      }

      //sets the date object as a string
      const newObject = {
        ...data,
        Date: new Date((data.Date.seconds as number) * 1000).toDateString(),
      };

      // Merging both workshop data and student data into one json object that is pushed to the main object
      big_data.push({
        workshop_data: newObject,
        student_data: student_data,
      });
    }
    const big_data_2 = JSON.stringify(big_data, null, 4);

    // Create a blob with data
    const jsonBlob = new Blob([big_data_2], {
      type: "application/json;charset=utf-8;",
    });

    // Send to user for download
    FileSaver.saveAs(jsonBlob, `Workshops.json`);
  };

  /**
   * Opens or closes the workshop editing dialog
   */
  showHideAddEditDialog = (): void => {
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
  receiveAddEditWorkshopInformationFromDialog = (Workshop_Object: workshop, wasSubmitPressed: boolean) => {
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
  addEditWorkshop = (Workshop_Object: workshop): void => {
    const workshopIndex: number = this.findWorkshopIndex(Workshop_Object.Workshop_ID);
    //the slice commands below ensure that when the workshop is saved then only the correct number of levels are passed back
    //For example if the workshop used to have 5 levels but was edited to only have 4 then the slice commands will remove the extra one
    Workshop_Object.Levels = Workshop_Object.Levels.slice(0, Workshop_Object.Number_Of_Levels);

    // if the workshop does not exist then create it else update it
    if (workshopIndex === -1) {
      this.createNewWorkshop(Workshop_Object);
    } else {
      this.updateWorkshop(Workshop_Object.Workshop_ID, Workshop_Object);
    }
  };

  /**
   * Loop through array to find the index of the workshop
   * @param {*} Workshop_ID
   */
  findWorkshopIndex = (Workshop_ID: string): number => {
    let workshopIndex = -1;
    // loops through array looking for the index that contains inforamtion on that specific workshop, saves that index in workshopView state which then will be passed in as props to the <Workshop /> Component
    for (let i = 0; i < this.state.workshops.length; i++) {
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
  findStudentIndex = (Workshop_ID: string): number => {
    let studentIndex = -1;
    for (let i = 0; i < this.state.studentsAtWorkshop.length; i++) {
      if (this.state.studentsAtWorkshop[i].Workshop_ID === Workshop_ID) {
        studentIndex = i;
      }
    }
    return studentIndex;
  };

  /**
   * Reset the alert status once it has been closed
   */
  resetAlertStatus = (): void => {
    this.setState({
      alert: false,
      alertText: "Unknown error occurred",
    });
  };

  render(): JSX.Element {
    //maps out the array into UI components, this is for the admin page that shows all workshops which is why expandState is set to false
    const workshopList = this.state.workshops.map((item, index) => (
      <WorkshopBar
        expandState={false}
        expandWindow={this.openWorkshopWindow}
        data={item}
        students={this.state.studentsAtWorkshop[index]}
        key={index}
      />
    ));

    //maps out the array into UI components to be displayed in the tiles at the top
    const tiles = this.state.cards.map((item, index) => (
      <Col key={index}>
        <CardTile data={item} />
      </Col>
    ));

    return (
      <div>
        <NavBar />
        <Container fluid>
          {this.state.alert ? (
            <div className="m-1 mt-3 m-lg-5">
              <Alert variant="danger" onClose={() => this.resetAlertStatus()} dismissible>
                {this.state.alertText}
              </Alert>
            </div>
          ) : (
            ""
          )}
          {!this.state.studentsLoaded && this.state.workshopsLoaded ? (
            <Loading />
          ) : (
            <>
              <div className="m-1 mt-3 m-lg-5">
                <Row>{tiles}</Row>
              </div>

              <div className="m-1 mb-4 m-lg-5">
                {/* If the admin dashbaord should be displaying the expanded view of a workshop then it displays the <WorkshopBar /> at the top followed by the <Workshop />, else it displays a list of all the <WorkshopBar /> */}
                {this.state.viewWorkshop ? (
                  <div>
                    <WorkshopBar
                      expandState={true}
                      expandWindow={this.openWorkshopWindow}
                      data={this.state.workshops[this.state.workshopView]}
                      students={this.state.studentsAtWorkshop[this.state.workshopView]}
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
              {/* This componenet does not actually get rendered initially since the dialogState is false, its just here as a placeholder */}
              <WorkshopEdit
                isOpen={this.state.addWorkshopDialogState}
                titleText="Workshop Panel"
                messageText="Add workshop information below"
                submit={this.receiveAddEditWorkshopInformationFromDialog}
                newWorkshop={true}
              />
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
