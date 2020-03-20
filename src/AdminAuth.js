import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';
import './AdminAuth.css';

class AdminAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.fillUsername = this.fillUsername.bind(this);
        this.fillPassword = this.fillPassword.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    fillUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    fillPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    //extracting a function call here instead of directly calling it just in case we want to do something locally later
    authenticate() {
        this.props.authenticate(this.state.username, this.state.password);
    }


    render() {
        return (
            <div>
                <NavBar />
                <Container fluid>
                    
                    <div className="m-5 p-5 floating-icon">
                        <Row>
                            <Col xs={12} sm={12} md={5}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={this.state.username}
                                        onChange={this.fillUsername}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} sm={12} md={5}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        value={this.state.password}
                                        onChange={this.fillPassword}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <Button onClick={this.authenticate} variant="success">Login</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

        );
    }
}

export default AdminAuth;