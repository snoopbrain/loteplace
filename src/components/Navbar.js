import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Navbar.css'; // Importar CSS personalizado

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
    <Container>
      <Navbar.Brand as={Link} to="/">Bienes Raíces</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>
          <Nav.Link as={Link} to="/properties">Propiedades</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
        </Nav>
        <Form className="d-flex me-3 search-form">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
          />
          <Button variant="outline-light">Buscar</Button>
        </Form>
        <Nav className="social-icons">
          <Nav.Link href="https://www.facebook.com" target="_blank">
            <FaFacebookF />
          </Nav.Link>
          <Nav.Link href="https://www.twitter.com" target="_blank">
            <FaTwitter />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com" target="_blank">
            <FaInstagram />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
