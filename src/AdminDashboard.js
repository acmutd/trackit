import React from 'react';
import WorkshopBar from './WorkshopBar';
import NavBar from './NavBar';
import CardTile from './CardTile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
            Workshop_Name: "firebase",
            Day: "Monday",
            Date: "16",
            Month: "March",
            Year: "2020"
        }

        let second = {
            Level_Descriptions: ["check part 1", "check part 2", "check part 3"],
            Number_Of_Levels: 3,
            Workshop_ID: "azure",
            Workshop_Name: "azure",
            Day: "Tuesday",
            Date: "17",
            Month: "March",
            Year: "2020"
        }

        let third = {
            Level_Descriptions: ["info part 1", "info part 2", "info part 3"],
            Number_Of_Levels: 3,
            Workshop_ID: "aws",
            Workshop_Name: "aws",
            Day: "Wednesday",
            Date: "18",
            Month: "March",
            Year: "2020"
        }

        //more hard coded data here, this is for the texts present in the cards present on the dashboard
        let cfirst = {
            title: "Admin",
            subtitle: "Administrative Tools",
            description: "Advanced tools for configurating workshop data",
            linkone: "#",
            linkonetext: "",
            linktwo: "#",
            linktwotext: ""
        }

        let csecond = {
            title: "Development",
            subtitle: "Development Tools",
            description: "Try out beta tools for customizing trackit",
            linkone: "#",
            linkonetext: "",
            linktwo: "#",
            linktwotext: ""
        }

        let cthird = {
            title: "Social",
            subtitle: "Media Tools",
            description: "Access resources and social media",
            linkone: "#",
            linkonetext: "",
            linktwo: "#",
            linktwotext: ""
        }
        this.state = {
            workshops: [first, second, third],
            cards: [cfirst, csecond, cthird]
        }
    }

    render() {

        let workshop = this.state.workshops.map(item => <WorkshopBar data={item} />);
        let tiles = this.state.cards.map(item => <Col><CardTile data={item}/></Col>);
        console.log(tiles);

        return (
            <div>
                <NavBar />
                <Container fluid>
                    <div className="m-5">
                        <Row>
                            {tiles}
                        </Row>
                    </div>
                    <div className="m-5">
                        {workshop}
                    </div>
                </Container>
            </div>
        );
    }
}

export default AdminDashboard;