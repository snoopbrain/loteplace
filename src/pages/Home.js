import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../data/properties';
import Filtros from '../components/Filtros';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceMin: '',
    priceMax: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter(property => {
    return (
      (filters.location ? property.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.type ? property.type === filters.type : true) &&
      (filters.priceMin ? parseFloat(property.price.replace(/[^0-9.-]+/g, "")) >= parseFloat(filters.priceMin) : true) &&
      (filters.priceMax ? parseFloat(property.price.replace(/[^0-9.-]+/g, "")) <= parseFloat(filters.priceMax) : true)
    );
  });

  return (
    <div>
      <div className="hero-section">
        <Container className="text-center text-white">
          <h1>Bienvenido a Bienes Raíces</h1>
          <p>Tu hogar soñado te espera. Descubre un lugar donde te encantará vivir.</p>
          <Button as={Link} to="/properties" variant="primary" size="lg">Ver Todas las Propiedades</Button>
        </Container>
      </div>

      <Container className="my-4">
        <Filtros filters={filters} handleFilterChange={handleFilterChange} />

        <Row>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={property.image} />
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>{property.description}</Card.Text>
                    <Card.Text><strong>Precio:</strong> {property.price}</Card.Text>
                    <Card.Text><strong>Ubicación:</strong> {property.location}</Card.Text>
                    <Button as={Link} to={`/properties/${property.id}`} variant="primary">Más Detalles</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No se encontraron propiedades.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
