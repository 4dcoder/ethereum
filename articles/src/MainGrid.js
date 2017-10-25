import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './App.css';

class MainGrid extends React.Component {
  render() {
    return (
      
        <Grid className="center">
            <Row className="show-grid">
            <Col xs={12} md={8} className="text-left">99.844754 ethers</Col>
            <Col xs={6} md={4} className="text-right">0xaue84m382alsn1</Col>
            </Row>
        
            <Row className="show-grid">
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
            </Row>
        
            <Row className="show-grid">
            <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
            </Row>
        
            <Row className="show-grid">
            <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
            <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
            </Row>
        </Grid>
    );
  }
}

export default MainGrid;
