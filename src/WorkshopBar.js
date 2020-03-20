import React from 'react';
import Nav from 'react-bootstrap/Nav';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import './WorkshopBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkshopBar extends React.Component {
    constructor(props) {
        super(props);
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
                        <Nav.Item className="ml-auto">
                            <Nav.Link disabled><FontAwesomeIcon icon={faEdit} size="lg"/>&nbsp;Disabled</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><FontAwesomeIcon icon={faPlus} size="lg"/></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default WorkshopBar;