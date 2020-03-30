import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button'

class WorkshopLevelBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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
                            <h1>Workshop Level: {this.props.Workshop_Level}</h1>
                        </Nav.Item>
                        <Nav.Item>
                            <div className="mt-3">
                                <Slider
                                    defaultValue={1}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={this.props.maxLevel}
                                />

                            </div>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Button variant="success">Confirm</Button>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default WorkshopLevelBar;