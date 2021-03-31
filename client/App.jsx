import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _, { where } from 'underscore';
//Child Components
import NPList from './components/NPList.jsx';
import HikesList from './components/HikesList.jsx';
//React Bootstrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TabContainer from 'react-bootstrap/TabContainer';
import ListGroup from 'react-bootstrap/ListGroup';

const App = () => {
    const [parksInfoArr, setParksInfoArr] = useState([]);
    const [hikeInfoArr, setHikeInfoArr] = useState([]);
    const [displayHikesInfoArr, setDisplayHikesInfoArr] = useState([]);

    // const [isNPListShowing, setIsNPListShowing] = React.useState(true);

    const getParksInfo = () => {
        axios.get('/api/parksInfo')
            .then((data) => {
                const npArr = _.where(data.data, { designation: "National Park" });
                setParksInfoArr(npArr);
                //setDisplayParksInfoArr(npArr);
            })
            .catch((err) => console.log(err));
    }

    const getHikesInfo = (parkCode) => {
        console.log(parkCode)
        axios.get(`/api/hikingTrailsInfo/${parkCode}`)
            .then((data) => {
                console.log('data coming in from the GET request: ', data.data);
                setHikeInfoArr(data.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => getParksInfo(), []);

    return (
        <React.Fragment>
            <Container fluid>
                <Row><h1>Bootket List</h1></Row>
                <Row>
                    <Col>
                        <h3>National Parks</h3>
                        <NPList 
                          parksInfoArr={parksInfoArr}
                          getHikesInfo={getHikesInfo}
                        />
                    </Col>
                    <Col>
                        <h3>Hikes List</h3>
                        <HikesList 
                          hikeInfoArr={hikeInfoArr}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default App;

