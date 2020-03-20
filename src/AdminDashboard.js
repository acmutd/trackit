import React from 'react';
import WorkshopBar from './WorkshopBar';
import Container from 'react-bootstrap/Container';
import './AdminDashboard.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        //hardcoded data below, will need to eventually read back the same information from firebase and receive it as props
        //data here is missing date field from the database schema, needs to be added in as a field for all items in the array
        let first = {
            Level_Descriptions: ["info part 1", "info part 2", "info part 3"],
            Number_Of_Levels: 3,
            Workshop_ID: "firebase",
            Workshop_Name: "firebase"
        }

        let second = {
            Level_Descriptions: ["check part 1", "check part 2", "check part 3"],
            Number_Of_Levels: 3,
            Workshop_ID: "azure",
            Workshop_Name: "azure"
        }

        let third = {
            Level_Descriptions: ["info part 1", "info part 2", "info part 3"],
            Number_Of_Levels: 3,
            Workshop_ID: "aws",
            Workshop_Name: "aws"
        }
        console.log(first);
        this.state = {
            workshops: [first, second, third]
        }
    }

    render() {

        let workshop = this.state.workshops.map(item => <li key={item.Workshop_ID}><WorkshopBar data={item} /></li>)

        return (
            <div>
                <Container fluid>
                    <h1>Welcome to the dashbaord</h1>
                    <h2>{this.props.username}</h2>
                    <h2>{this.props.password}</h2>

                    <ul>
                        {workshop}
                    </ul>
                </Container>
            </div>
        );
    }
}

export default AdminDashboard;