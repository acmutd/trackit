import * as React from "react";
import { Nav, ProgressBar } from "react-bootstrap";
import {
  faExclamationTriangle,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * The is a Student bar that shows detailed information about a student. 
 * It shows their name, their progress in the workshop and an option to see if they have submitted an alert and to download their information
 */

interface StudentBarProps {
  TotalProgress: number; 
  Student_Name: string;
  key: number;
  Progress: number;
}

class StudentBar extends React.Component<StudentBarProps, {}> {
  render() {
    //makes the data dynamic by calculating how much is complete, how much is being worked on and how much is left to be finished
    //probably extract this into a function and just load 3 values into render in the future
    let maxProgress = this.props.TotalProgress;
    let percentWorkingProgress = (1 / maxProgress) * 100;
    let currentProgress = this.props.Progress;
    let percentCurrentProgress = (currentProgress / maxProgress) * 100;
    if (currentProgress === maxProgress) {
      percentWorkingProgress = 0;
    }
    let percentIncompleteProgress =
      100 - percentCurrentProgress - percentWorkingProgress;

    return (
      <div>
        <div className="m-2 m-lg-3 mt-3 mt-lg-5 p-4 floating-icon">
          <Nav justify className="flex-column flex-lg-row d-flex">
            <Nav.Item>
              <h1>{this.props.Student_Name}</h1>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <ProgressBar>
                <ProgressBar
                  striped
                  variant="success"
                  animated
                  label={this.props.Progress}
                  now={percentCurrentProgress}
                  key={1}
                />
                <ProgressBar
                  striped
                  variant="warning"
                  animated
                  label={this.props.Progress + 1}
                  now={percentWorkingProgress}
                  key={2}
                />
                <ProgressBar
                  striped
                  variant="danger"
                  animated
                  now={percentIncompleteProgress}
                  key={3}
                />
              </ProgressBar>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>
                <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
                &nbsp;Alert
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <FontAwesomeIcon icon={faDownload} size="lg" />
                &nbsp;Download
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    );
  }
}

export default StudentBar;
