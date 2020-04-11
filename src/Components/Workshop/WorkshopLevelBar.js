import React from "react";
import Slider from "@material-ui/core/Slider";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

/**
 * Administrative toolbar to control workshop settings such as enabling a workshop, disabling a workshop, clearing all students to reset a workshop
 * Also contains a slider to enable workshop levels
 * 
 * Author: Harsha Srikara
 * Date: 4/6/20
 */
class WorkshopLevelBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workshopLevel: this.props.Workshop_Level,
      enabled: this.props.enabled
    };

    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.enableWorkshop = this.enableWorkshop.bind(this);
    this.disableWorkshop = this.disableWorkshop.bind(this);
  }

  incrementLevel() {
    this.setState(state => ({ workshopLevel: state.workshopLevel + 1 }));
    this.props.incrementLevel();
    //add checks to ensure it cannot go over maxLevel
  }
  decrementLevel() {
    this.setState(state => ({ workshopLevel: state.workshopLevel - 1 }));
    this.props.decrementLevel();
    //add checks to ensure it cannot go sub-zero
  }

  enableWorkshop() {
    this.setState({enabled: true});
    this.props.enableWorkshop();
  }

  disableWorkshop() {
    this.setState({enabled: false});
    this.props.disableWorkshop();
  }

  render() {
    function valuetext(value) {
      return value;
    }

    return (
      <div>
        <div className="m-3 mt-5 p-4 floating-icon">
          <Nav justify>
            <Nav.Item>
              <h1>Manage Workshop</h1>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.enableWorkshop}
                  variant="success"
                  size="lg"
                  disabled={this.state.enabled}
                >
                  Enable Workshop
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.disableWorkshop}
                  variant="warning"
                  size="lg"
                  disabled={!this.state.enabled}
                >
                  Disable Workshop
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.props.addEditWorkshop}
                  variant="primary"
                  size="lg"
                >
                  Edit Workshop
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.props.exportWorkshop}
                  variant="secondary"
                  size="lg"
                >
                  Export Workshop
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.props.clearAllStudents}
                  variant="dark"
                  size="lg"
                >
                  Clear All Students
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Button
                  onClick={this.props.deleteWorkshop}
                  variant="danger"
                  size="lg"
                >
                  Delete Workshop
                </Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr />
          <Nav justify>
            <Nav.Item>
              <div className="mt-2">
                <h3>Workshop Level: {this.state.workshopLevel}</h3>
              </div>
            </Nav.Item>
            <Nav.Item>
              <div className="mt-3">
                <Slider
                  value={this.state.workshopLevel}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={this.props.maxLevel}
                  disabled={!this.state.enabled}
                />
              </div>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Fab color="primary" aria-label="remove" className="ml-2 mr-2" disabled={!this.state.enabled}>
                  <RemoveIcon onClick={this.decrementLevel} />
                </Fab>
                <Fab color="primary" aria-label="add" className="ml-2 mr-2" disabled={!this.state.enabled}>
                  <AddIcon onClick={this.incrementLevel} />
                </Fab>
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                            <Nav.Link>
                                <Button variant="success" size="lg">Confirm</Button>
                            </Nav.Link>
                        </Nav.Item> */}
          </Nav>
        </div>
      </div>
    );
  }
}

export default WorkshopLevelBar;
