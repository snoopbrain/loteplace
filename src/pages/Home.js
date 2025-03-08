import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Filtros from '../components/Filtros';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceMin: '',
    priceMax: '',
  });

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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter(property => {
    const price = typeof property.price === "string" 
      ? parseFloat(property.price.replace(/[^0-9.-]+/g, ""))
      : parseFloat(property.price);
  
    return (
      (filters.location ? property.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.type ? property.type === filters.type : true) &&
      (filters.priceMin ? price >= parseFloat(filters.priceMin) : true) &&
      (filters.priceMax ? price <= parseFloat(filters.priceMax) : true)
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

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
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
        )}
      </Container>
    </div>
  );
};

export default Home;
