import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://146.190.143.234:8080/api/lotes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProperties(data.slice(0, 3));
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
    <div>
      <div className="hero-section">
        <Container className="text-center text-white">
          <h1>Bienvenido a Bienes Raíces</h1>
          <p>Tu hogar soñado te espera. Descubre un lugar donde te encantará vivir.</p>

          {/* Contenedor que agrupa la imagen y el botón */}
          <div className="hero-image-wrapper">
            <img
              src="https://marketplacespringboot.s3.us-east-1.amazonaws.com/db572f89-dcfb-47be-8c48-43ba0d91a806_BloqueM5.jpg"
              alt="Hero"
              className="hero-image"
            />
            <Button
              as={Link}
              to="/properties"
              variant="primary"
              size="lg"
              className="hero-button"
            >
              Ver Todas las Propiedades
            </Button>
          </div>
        </Container>
      </div>

      <Container className="my-4">
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
                  <Card className="property-card modern">
                    <div className="property-image-wrapper">
                      {property.isFeatured && <span className="property-badge">Destacado Gold</span>}
                      {property.isUsed && <span className="property-used">Usado</span>}
                      <Card.Img variant="top" src={property.image} className="property-image" />
                    </div>
                    <Card.Body className="property-body">
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
                <p>No hay propiedades disponibles en este momento.</p>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
