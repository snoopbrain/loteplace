import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../data/properties';

const Properties = () => (
  <Container className="my-5">
    <Row className="mb-4 text-center">
      <Col>
        <h1>Propiedades</h1>
        <p>Descubre nuestra amplia variedad de propiedades y encuentra el hogar perfecto para ti.</p>
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
              <Button as={Link} to={`/properties/${property.id}`} variant="primary">Más Detalles</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Properties;
