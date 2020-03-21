import React from 'react';
import WorkshopBar from './WorkshopBar';
import NavBar from './NavBar';
import Workshop from './Workshop';
import CardTile from './CardTile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
            linktwotext: "link"
        }

        let wfirst = {
            Workshop_ID: "firebase",
            Students: ["anirudh", "harsha", "sivam"],
            Progress: [3, 5, 4]
        }

        let wsecond = {
            Workshop_ID: "azure",
            Students: ["atharv", "gautam", "aashish"],
            Progress: [2, 3, 4]
        }

        let wthird = {
            Workshop_ID: "aws",
            Students: ["sanjana", "ifrit", "shivani", "vamika", "sanjeev", "penupala"],
            Progress: [5, 4, 2, 1, 3, 4]
        }

        this.state = {
            workshops: [first, second, third],
            cards: [cfirst, csecond, cthird],
            studentsAtWorkshop: [wfirst, wsecond, wthird],
            viewWorkshop: false, //toggle between true or false
            workshopView: 1 //change this number to 0 1 or 2

        }
        this.openWorkshopWindow = this.openWorkshopWindow.bind(this);
    }

    openWorkshopWindow(Workshop_ID) {
        var workshopIndex = 0;
        for (var i = 0; i < this.state.workshops.length; i++) {
            if (this.state.workshops[i].Workshop_ID === Workshop_ID) {
                workshopIndex = i;
            }
        }
        this.setState(state => ({ viewWorkshop: !state.viewWorkshop, workshopView: workshopIndex }));
    }

    render() {

        let workshopList = this.state.workshops.map(item => <WorkshopBar expandState={false} expandWindow={this.openWorkshopWindow} data={item} />);
        let tiles = this.state.cards.map(item => <Col><CardTile data={item} /></Col>);

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
                        {this.state.viewWorkshop ?
                            <div>
                                <WorkshopBar expandState={true} expandWindow={this.openWorkshopWindow} data={this.state.workshops[this.state.workshopView]} />
                                <Workshop properties={this.state.workshops[this.state.workshopView]} data={this.state.studentsAtWorkshop[this.state.workshopView]} />
                            </div> : workshopList}
                    </div>
                </Container>
            </div>
        );
    }
}

export default AdminDashboard;