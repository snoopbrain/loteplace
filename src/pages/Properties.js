import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://146.190.143.234:8080/api/lotes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('La API no devolvió un array:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Propiedades</h1>
          <p>Descubre nuestra amplia variedad de propiedades y encuentra el hogar perfecto para ti.</p>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {properties.length > 0 ? (
            properties.map(property => (
              <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="property-card">
                  <Card.Img variant="top" src={property.image} />
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>{property.description}</Card.Text>
                    <Card.Text><strong>Precio:</strong> ${property.price}</Card.Text>
                    <Card.Text><strong>Área:</strong> {property.area} m²</Card.Text>
                    <Button as={Link} to={`/properties/${property.id}`} variant="primary">Más Detalles</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No hay propiedades disponibles en este momento.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Properties;
