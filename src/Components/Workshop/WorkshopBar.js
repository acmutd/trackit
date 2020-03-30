import React from "react";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * The is a workshop bar that shows a minimized view of the information in a workshop, quick look at the data available
 *
 * Author: Harsha Srikara
 * Date: 3/28/20
 */
class WorkshopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandView: this.props.expandState //if this is true then the <Workshop /> Component is also rendered on the AdminDashboard, here it only changes the "Show View" to "Hide View"
    };
    this.switchView = this.switchView.bind(this);
  }

  switchView() {
    // the code line below is commented becuz it would only be required if the same component was being used, however a different <WorkshopBar /> Component gets rendered when the expandView state changes
    // this.setState(state => ({ expandView: !state.expandView }));
    this.props.expandWindow(this.props.data.Workshop_ID);
  }

  render() {
    return (
      <div>
        <div className="m-3 mt-5 p-4 floating-icon">
          <Nav justify>
            <Nav.Item>
              <h1>{this.props.data.Workshop_ID}</h1>
            </Nav.Item>
            <Nav.Item className="mt-2">
              <h3>{this.props.data.Day}</h3>
            </Nav.Item>
            <Nav.Item className="mt-2">
              <h3>
                {this.props.data.Date} {this.props.data.Month}{" "}
                {this.props.data.Year}
              </h3>
            </Nav.Item>

            {/* This needs to eventually be dynamic and use inforamtion passed in as props to render the actual proportions instead of hardcoded values */}
            <Nav.Item className="mt-3">
              <ProgressBar>
                <ProgressBar
                  striped
                  variant="success"
                  animated
                  now={35}
                  key={1}
                />
                <ProgressBar
                  striped
                  variant="warning"
                  animated
                  now={20}
                  key={2}
                />
                <ProgressBar
                  striped
                  variant="danger"
                  animated
                  now={10}
                  key={3}
                />
              </ProgressBar>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <FontAwesomeIcon icon={faEdit} size="lg" />
                &nbsp;Edit
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <FontAwesomeIcon icon={faDownload} size="lg" />
                &nbsp;Download
              </Nav.Link>
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
