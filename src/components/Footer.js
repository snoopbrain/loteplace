import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer bg-dark text-white mt-5 p-4">
    <Container>
      <Row>
        <Col md={4} className="mb-4">
          <h5>Contáctanos</h5>
          <p>123 Calle Bienes Raíces, Ciudad, País</p>
          <p>Teléfono: +1 (234) 567-890</p>
          <p>Correo electrónico: info@bienesraices.com</p>
        </Col>
        <Col md={4} className="mb-4">
          <h5>Enlaces Rápidos</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white">Inicio</a></li>
            <li><a href="#" className="text-white">Nosotros</a></li>
            <li><a href="#" className="text-white">Propiedades</a></li>
            <li><a href="#" className="text-white">Contacto</a></li>
          </ul>
        </Col>
        <Col md={4} className="mb-4">
          <h5>Síguenos</h5>
          <div className="d-flex">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FaInstagram size={24} />
            </a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
