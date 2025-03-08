import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');

  useEffect(() => {
    fetch(`http://146.190.143.234:8080/api/lotes/${id}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Error al obtener la propiedad:', error));
  }, [id]);

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    console.log("Propuesta de precio enviada:", offerPrice);
  };

  if (!property) {
    return <h1 className="text-center my-5">Propiedad no encontrada</h1>;
  }

  return (
    <Container className="property-details-container my-5">
      <Row>
        <Col md={8}>
          <Card className="property-details-card">
            <Card.Img variant="top" src={property.image} className="property-details-image" />
            <Card.Body>
              <Card.Title className="property-details-title">{property.title}</Card.Title>
              <p className="property-details-price">${property.price}</p>
              <p className="property-details-area">Área: {property.area} m²</p>
              <p className="property-details-location">Ubicación: {property.location}</p>
              <p className="property-details-description">{property.description}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="contact-card">
            <Card.Body>
              <div className="agent-info">
                <img src={property.agentImage} alt={property.userName} className="agent-image" />
                <h3 className="agent-name">{property.userName}</h3>
              </div>
              <p className="contact-instructions">Completa tus datos para habilitar los medios de contacto</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Nombre y Apellido" required />
                </Form.Group>
                <Form.Group className="mb-3 d-flex">
                  <Form.Select className="country-code">
                    <option>+57</option>
                  </Form.Select>
                  <Form.Control type="tel" placeholder="Teléfono" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={2} placeholder="Mensaje" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Aceptas nuestros Términos, condiciones y Política de privacidad" required />
                </Form.Group>
                <Button variant="primary" className="contact-button" type="submit" disabled>
                  Contactar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="offer-card mt-3">
            <Card.Body>
              <h3>¿Quieres proponer un precio?</h3>
              <Form onSubmit={handleOfferSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="number" 
                    placeholder="Ingresa tu oferta" 
                    value={offerPrice} 
                    onChange={(e) => setOfferPrice(e.target.value)} 
                    required 
                  />
                </Form.Group>
                <Button variant="success" className="offer-button" type="submit">
                  Enviar Oferta
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
