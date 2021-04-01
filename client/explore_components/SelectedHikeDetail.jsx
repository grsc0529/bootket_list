import React from 'react';
import SelectedHikePhoto from './SelectedHikePhoto.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SelectedHikeDetail = ({ selectedHikeInfo }) => {
    return (
        <React.Fragment>
            <Card>
                <SelectedHikePhoto 
                   selectedHikePhotosArr={selectedHikeInfo.images}
                />
                <Card.Body>
                    <Card.Title>{selectedHikeInfo.title}</Card.Title>
                    <Container>
                        <Row>
                            <Col sm={3}>
                                {selectedHikeInfo.duration.length > 0 
                                  ? <Card.Text><img src="../images/chronometer.png" width="30px"></img>{selectedHikeInfo.duration}</Card.Text>
                                  : null
                                }
                              {selectedHikeInfo.arePetsPermitted === "true" 
                                ? <Card.Text><img src="../images/pets-allowed.png" width="30px"></img>Pets Allowed</Card.Text>
                                : <Card.Text><img src="../images/no-pets-allowed.png" width="30px"></img> No Pets Allowed</Card.Text>
                              }
                            </Col>
                            <Col>
                              <Card.Title>Description</Card.Title>
                              <Card.Text>{selectedHikeInfo.shortDescription}</Card.Text>
                              <Card.Title>Accessibility</Card.Title>
                              <Card.Text>{selectedHikeInfo.accessibilityInformation}</Card.Text>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default SelectedHikeDetail;



// <div>{selectedHikeInfo.accessibilityInformation}</div>
// <div>{selectedHikeInfo.arePetsPermitted}</div>
// <div>{selectedHikeInfo.arePetsPermittedWithRestrictions}</div>
// <div>{selectedHikeInfo.duration}</div>
// <div>{selectedHikeInfo.durationDescription}</div>
// <div>{selectedHikeInfo.shortDescription}</div>