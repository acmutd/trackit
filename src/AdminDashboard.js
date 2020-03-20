import React from 'react';
import './AdminDashboard.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Welcome to the dashbaord</h1>
                <h2>{this.props.username}</h2>
                <h2>{this.props.password}</h2>
            </div>
        );
    }
}

export default AdminDashboard;