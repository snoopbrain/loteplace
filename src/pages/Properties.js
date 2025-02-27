import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../data/properties';

const Properties = () => (
  <Container className="my-5">
    <Row className="mb-4 text-center">
      <Col>
        <h1>Properties</h1>
        <p>Discover our wide range of properties to find the perfect home for you.</p>
      </Col>
    </Row>
    <Row>
      {properties.map(property => (
        <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
          <Card className="property-card">
            <Card.Img variant="top" src={property.image} />
            <Card.Body>
              <Card.Title>{property.title}</Card.Title>
              <Card.Text>{property.description}</Card.Text>
              <Button as={Link} to={`/properties/${property.id}`} variant="primary">More Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Properties;