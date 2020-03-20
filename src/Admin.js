import React from 'react';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard'
import './Admin.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            password: ''
        }

        this.authenticate = this.authenticate.bind(this);
        this.readFromDatabase = this.readFromDatabase.bind(this);
    }

    authenticate(username, password) {
        //write some legit authentication logic in here eventually
        //if authentication passes then call readFromDatabase(); otherwise not needed
        this.setState({
            loggedIn: true,
            username: username,
            password: password
        });
    }

    readFromDatabase() {
        //read data from database and store it in this.state
        //eventually pass in the data to AdminDashboard as props
    }

    render() {
        return(
            <div>
                {this.state.loggedIn ? <AdminDashboard username={this.state.username} password={this.state.password}/> : <AdminAuth authenticate={this.authenticate} />}
            </div>
        );
    }
}

export default Admin;