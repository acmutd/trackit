import * as React from "react";
import { Slider, Fab } from "@material-ui/core";
import { Nav, Button, Row, Col } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

/**
 * Administrative toolbar to control workshop settings such as enabling a workshop, disabling a workshop, clearing all students to reset a workshop
 * Also contains a slider to enable workshop levels
 */

interface WorkshopLevelBarProps {
  incrementLevel(): void;
  decrementLevel(): void;
  enableWorkshop(): void;
  disableWorkshop(): void;
  clearAllStudents(): void;
  deleteWorkshop(): void;
  addEditWorkshop(): void;
  exportWorkshop(): void;
  Workshop_Level: number;
  enabled: boolean;
  maxLevel: number;
}

interface WorkshopLevelBarState {
  workshopLevel: number;
  enabled: boolean;
}

class WorkshopLevelBar extends React.Component<WorkshopLevelBarProps, WorkshopLevelBarState> {
  state: WorkshopLevelBarState = {
    workshopLevel: this.props.Workshop_Level,
    enabled: this.props.enabled,
  };

  /**
   * Updates if there's a change to the props passed in
   * @param {WorkshopLevelBarProps} prevProps
   */
  componentDidUpdate(prevProps: WorkshopLevelBarProps): void {
    if (this.props !== prevProps) {
      this.setState({
        workshopLevel: this.props.Workshop_Level,
        enabled: this.props.enabled,
      });
    }
  }

  /**
   * Calls function passed in from props
   */
  incrementLevel = (): void => {
    if (this.state.workshopLevel < this.props.maxLevel) {
      this.setState((state) => ({ workshopLevel: state.workshopLevel + 1 }));
      this.props.incrementLevel();
    }
  };

  /**
   * Calls function passed in from props
   */
  decrementLevel = (): void => {
    if (this.state.workshopLevel > 1) {
      this.setState((state) => ({ workshopLevel: state.workshopLevel - 1 }));
      this.props.decrementLevel();
    }
  };

  /**
   * Calls function passed in from props
   */
  enableWorkshop = (): void => {
    this.setState({ enabled: true });
    this.props.enableWorkshop();
  };

  /**
   * Calls function passed in from props
   */
  disableWorkshop = (): void => {
    this.setState({ enabled: false });
    this.props.disableWorkshop();
  };

  render(): JSX.Element {
    return (
      <div>
        <div className="m-2 mt-3 m-lg-3 mt-lg-5 p-4 floating-icon">
          <Nav justify className="flex-column flex-lg-row d-flex">
            <Nav.Item>
              <h1>
                <div dangerouslySetInnerHTML={{ __html: "Manage&nbspWorkshop" }} />
              </h1>
            </Nav.Item>
            <Row>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={this.enableWorkshop} variant="success" size="lg" disabled={this.state.enabled}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Enable&nbspWorkshop",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={this.disableWorkshop} variant="warning" size="lg" disabled={!this.state.enabled}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Disable&nbspWorkshop",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={() => this.props.addEditWorkshop()} variant="primary" size="lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Edit&nbspWorkshop",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={() => this.props.exportWorkshop()} variant="secondary" size="lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Export&nbspWorkshop",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={() => this.props.clearAllStudents()} variant="dark" size="lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Clear&nbspAll&nbspStudents",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Nav.Item>
                  <Nav.Link>
                    <Button onClick={() => this.props.deleteWorkshop()} variant="danger" size="lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: "Delete&nbspWorkshop",
                        }}
                      />
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Row>
          </Nav>
          <hr />
          <Nav justify className="flex-column flex-md-row d-flex">
            <Nav.Item>
              <div className="mt-2">
                <h3>Workshop Level: {this.state.workshopLevel}</h3>
              </div>
            </Nav.Item>
            <Nav.Item>
              <div className="mt-3">
                <Slider
                  value={this.state.workshopLevel}
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
          </Nav>
        </div>
      </div>
    );
  }
}

export default WorkshopLevelBar;
