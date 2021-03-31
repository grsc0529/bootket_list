import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _, { where } from 'underscore';
//My Child Components
import NPList from './components/NPList.jsx';
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
            <NPList />
            <Container fluid>
                <Row><h1>Bootket List</h1></Row>
                <Row>
                    <Col>
                        <h3>National Parks</h3>
                        <TabContainer id="list-group-tabs-example">
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        {parksInfoArr.map((park) => (
                                            <ListGroup.Item
                                                action
                                                key={park.id}
                                                value={park.parkCode}
                                                onClick={(event) => getHikesInfo(event.target.value)}
                                            >{park.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </TabContainer>
                    </Col>
                    <Col>
                        <h3>Hikes List</h3>
                        <TabContainer id="list-group-tabs-example">
                            <Row>
                                <Col>
                                    <ListGroup>
                                        {hikeInfoArr.map((hike) => (
                                            <ListGroup.Item
                                                action
                                                key={hike.id}
                                                // value={park.parkCode}
                                                // onClick={(event) => getHikesInfo(event.target.value)}
                                            >{hike.title}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </TabContainer>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default App;

