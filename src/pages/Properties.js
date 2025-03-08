import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    areaMin: '',
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

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter(property => {
    const price = typeof property.price === "string"
      ? parseFloat(property.price.replace(/[^0-9.-]+/g, ""))
      : parseFloat(property.price);

    const area = parseFloat(property.area);

    return (
      (filters.location ? property.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.areaMin ? area >= parseFloat(filters.areaMin) : true) &&
      (filters.priceMin ? price >= parseFloat(filters.priceMin) : true) &&
      (filters.priceMax ? price <= parseFloat(filters.priceMax) : true)
    );
  });

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Propiedades</h1>
          <p>Descubre nuestra amplia variedad de propiedades y encuentra el hogar perfecto para ti.</p>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Ej: Ciudad, barrio..."
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Área Mínima (m²)</Form.Label>
            <Form.Control
              type="number"
              name="areaMin"
              value={filters.areaMin}
              onChange={handleFilterChange}
              placeholder="Ej: 50"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Precio Mínimo ($)</Form.Label>
            <Form.Control
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleFilterChange}
              placeholder="Ej: 50000"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Precio Máximo ($)</Form.Label>
            <Form.Control
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleFilterChange}
              placeholder="Ej: 300000"
            />
          </Form.Group>
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
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="property-card modern">
                  <div className="property-image-wrapper">
                    {property.isFeatured && <span className="property-badge">Destacado Gold</span>}
                    {property.isUsed && <span className="property-used">Usado</span>}
                    <Card.Img variant="top" src={property.image} className="property-image" />
                  </div>
                  <Card.Body className="property-body">
                    <Card.Title className="property-title">{property.title}</Card.Title>
                    <div className="property-price">${property.price}</div>
                    <div className="property-area">{property.area} m²</div>
                    <div className="property-location">{property.location}</div>
                    <hr className="property-divider" />
                    <div className="property-agent">Publicado por <strong>{property.userName}</strong></div>
                    <Button className="property-contact modern-btn" as={Link} to={`/properties/${property.id}`}>
                      Detalles
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No hay propiedades disponibles con los filtros seleccionados.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Properties;
