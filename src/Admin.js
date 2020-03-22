import React from 'react';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard'
import './Admin.css';

/** This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 * 
 * Author: Harsha Srikara
 * Date: 3/22/20
 */
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false, //once authentication happens this will toggle to true
            username: '', //stores the username of person that logged in (not required)
            password: '' //stores the password of person that logged in (not required)
        }

        this.authenticate = this.authenticate.bind(this);
        this.readFromDatabase = this.readFromDatabase.bind(this);
    }

    /**
     * This function is passed as props to the AdminAuth Component which returns the username and password entered
     * Currrently just changes the loggedIn state to true without any checks
     * 
     * @param {*} username is the username of the person logging in
     * @param {*} password is the password of the person logging in
     */
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
                {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
                {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
                {this.state.loggedIn ? <AdminDashboard /> : <AdminAuth authenticate={this.authenticate} />}
            </div>
        );
    }
}

export default Admin;