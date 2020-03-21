import React from 'react';
import Nav from 'react-bootstrap/Nav';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './WorkshopBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkshopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandView: this.props.expandState
        }
        this.switchView = this.switchView.bind(this);
    }

    switchView() {
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
                            <h3>{this.props.data.Date} {this.props.data.Month} {this.props.data.Year}</h3>
                        </Nav.Item>

                        <Nav.Item className="mt-3">
                            <ProgressBar>
                                <ProgressBar striped variant="success" animated now={35} key={1} />
                                <ProgressBar striped variant="warning" animated now={20} key={2} />
                                <ProgressBar striped variant="danger" animated now={10} key={3} />
                            </ProgressBar>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><FontAwesomeIcon icon={faEdit} size="lg" />&nbsp;Edit</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><FontAwesomeIcon icon={faDownload} size="lg" />&nbsp;Download</Nav.Link>
                        </Nav.Item>
                        {this.state.expandView ?
                            <div>
                                <Nav.Item>
                                    <Nav.Link onClick={this.switchView}><h3>Hide View</h3></Nav.Link>
                                </Nav.Item>
                            </div> :
                            <div>
                                <Nav.Item>
                                    <Nav.Link onClick={this.switchView}><h3>Show View</h3></Nav.Link>
                                </Nav.Item>
                            </div>}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default WorkshopBar;