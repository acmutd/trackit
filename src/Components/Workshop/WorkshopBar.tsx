import * as React from "react";
import { Nav, ProgressBar } from "react-bootstrap";
import { workshop, studentsAtWorkshop } from "../Firebase/interface"

/**
 * The is a workshop bar that shows a minimized view of the information in a workshop
 * Quick look at the data available
 */

interface WorkshopBarState {
  expandView: boolean,
  refresh: boolean
}

interface WorkshopBarProps {
  expandWindow(Workshop_ID: string): void,
  expandState: boolean,
  students: studentsAtWorkshop, // studentsAtWorkshop object
  data: workshop, // workshop data object
}

class WorkshopBar extends React.Component<WorkshopBarProps, WorkshopBarState> {
  state: WorkshopBarState = {
    expandView: this.props.expandState, //if this is true then the <Workshop /> Component is also rendered on the AdminDashboard, here it only changes the "Show View" to "Hide View"
    refresh: false,
  };

  /**
   * Updates the workshop state if the props change
   * @param {WorkshopBarProps} prevProps 
   */
  componentDidUpdate(prevProps: WorkshopBarProps) {
    if (this.props.students !== prevProps.students) {
      this.setState(state  => ({
        refresh: !state.refresh, //will cause it to refresh since state changes
      }));
    }
  }

  /**
   * Toggles whether the expanded view is open or not
   */
  switchView = () => {
    this.props.expandWindow(this.props.data.Workshop_ID);
  }

  render() {
    //extract the day, month, year from the date Object
    let date = null;
    let month = null;
    let year = null;
    let day = null;
    let temp = new Date(this.props.data.Date?.seconds as number * 1000); //forces it to be number instead of being number | undefined
    if (temp != null) {
      date = temp.getDate();

      month = temp.getMonth();
      let monthsOfYear: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      month = monthsOfYear[month];

      year = temp.getFullYear();

      day = temp.getDay();
      let daysOfWeek: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      day = daysOfWeek[day];
    }

    //compute number of students behind and at the same level of progress as admin
    let studentsAtLevel: number = 0;
    let studentsBehindLevel: number = 0;
    for(var i = 0; i < this.props.students.Progress.length; i++) {
      if(this.props.students.Progress[i] < this.props.students.Level_Enabled) {
        studentsBehindLevel++;
      }
      else {
        studentsAtLevel++;
      }
    }
    let percentAtLevel = (studentsAtLevel/this.props.students.Progress.length)*100;
    let percentBehindLevel = (studentsBehindLevel/this.props.students.Progress.length)*100;

    return (
      <div>
        <div className="m-2 m-lg-3 mt-2 mt-lg-5 mb-3 mb-lg-5 p-4 floating-icon">
          <Nav justify className="flex-column flex-lg-row d-flex">
            <Nav.Item>
              <h1>{this.props.data.Workshop_ID}</h1>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <ProgressBar>
                <ProgressBar
                  striped
                  variant="success"
                  animated
                  now={percentAtLevel}
                  key={1}
                />
                <ProgressBar
                  striped
                  variant="warning"
                  animated
                  now={percentBehindLevel}
                  key={2}
                />
                <ProgressBar
                  striped
                  variant="danger"
                  animated
                  now={0} //unused
                  key={3}
                />
              </ProgressBar>
            </Nav.Item>
            <Nav.Item className="mt-2">
              <h3>
                {day} {date} {month} {year}
              </h3>
            </Nav.Item>
            {/* Toggles between "Show View" and "Hide View" when the expandView state changes */}
            {this.state.expandView ? (
              <div>
                <Nav.Item>
                  <Nav.Link onClick={this.switchView}>
                    <h3>Hide View</h3>
                  </Nav.Link>
                </Nav.Item>
              </div>
            ) : (
              <div>
                <Nav.Item>
                  <Nav.Link onClick={this.switchView}>
                    <h3>Show View</h3>
                  </Nav.Link>
                </Nav.Item>
              </div>
            )}
          </Nav>
        </div>
      </div>
    );
  }
}

export default WorkshopBar;
