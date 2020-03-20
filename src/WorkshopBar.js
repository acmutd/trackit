import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './WorkshopBar.css';

class WorkshopBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1>{this.props.data.Workshop_ID}</h1>
            </div>
        );
    }
}

export default WorkshopBar;