import React from "react";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



/**
 * The is a workshop bar that shows a minimized view of the information in a workshop, quick look at the data available
 *
 * Author: Harsha Srikara
 * Date: 3/22/20
 */
class StudentBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
          <div>
            <div className="m-3 mt-5 p-4 floating-icon">
              <Nav justify>
                <Nav.Item>
                  <h1>{this.props.Student_Name}</h1>
                </Nav.Item>
                {/* This needs to eventually be dynamic and use inforamtion passed in as props to render the actual proportions instead of hardcoded values */}
                <Nav.Item className="mt-3">
                  <ProgressBar>
                    <ProgressBar
                      striped
                      variant="success"
                      animated
                      now={50}
                      key={1}
                    />
                    <ProgressBar
                      striped
                      variant="warning"
                      animated
                      now={25}
                      key={2}
                    />
                    <ProgressBar
                      striped
                      variant="danger"
                      animated
                      now={25}
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