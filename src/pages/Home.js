import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../data/properties';
import testimonials from './testimonials';
import './Home.css'; // Importar CSS personalizado

const Home = () => {
  const featuredProperties = properties.slice(0, 3); // Seleccionar las primeras 3 propiedades como destacadas

  return (
    <div>
      <div className="hero-section">
        <Container className="text-center text-white">
          <h1>Bienvenido a Bienes Raíces</h1>
          <p>Tu hogar soñado te espera. Descubre un lugar donde te encantará vivir.</p>
          <Button as={Link} to="/properties" variant="primary" size="lg">Ver Todas las Propiedades</Button>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h2>Encuentra tu Hogar Perfecto</h2>
            <p>Ofrecemos una amplia variedad de propiedades para adaptarse a tus necesidades y presupuesto. Ya sea que busques una villa lujosa, un apartamento moderno o una acogedora cabaña, tenemos algo para todos.</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3>Propiedades Destacadas</h3>
            <Row>
              {featuredProperties.map(property => (
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
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3>Lo Que Dicen Nuestros Clientes</h3>
            <Carousel>
              {testimonials.map((testimonial, index) => (
                <Carousel.Item key={index}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Img variant="top" src={testimonial.image} className="rounded-circle w-25 mb-3" />
                      <Card.Text className="blockquote mb-0">
                        "{testimonial.feedback}"
                      </Card.Text>
                      <footer className="blockquote-footer mt-2">{testimonial.name}</footer>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3>¿Por Qué Elegirnos?</h3>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Agentes Experimentados</Card.Title>
                    <Card.Text>Nuestros agentes tienen años de experiencia en el mercado inmobiliario.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Enfoque en el Cliente</Card.Title>
                    <Card.Text>Priorizamos las necesidades de nuestros clientes y brindamos un servicio personalizado.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Amplia Gama de Propiedades</Card.Title>
                    <Card.Text>Ofrecemos una variedad de propiedades para todos los gustos y presupuestos.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
