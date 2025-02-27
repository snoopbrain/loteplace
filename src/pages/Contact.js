import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario (por ejemplo, enviar datos a un servidor)
    console.log('Datos del formulario enviados:', formData);
    // Restablecer los campos del formulario
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Contáctanos</h1>
          <p>Nos encantaría saber de ti. Por favor, completa el siguiente formulario para ponerte en contacto con nosotros.</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <h2>Detalles de Contacto</h2>
          <p><strong>Dirección:</strong> 123 Calle Bienes Raíces, Ciudad, País</p>
          <p><strong>Teléfono:</strong> +1 (234) 567-890</p>
          <p><strong>Correo Electrónico:</strong> info@bienesraices.com</p>
        </Col>
        <Col md={6}>
          <h2>Formulario de Contacto</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa tu mensaje"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
