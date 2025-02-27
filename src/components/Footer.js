import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import custom CSS

const Footer = () => (
  <footer className="footer bg-dark text-white mt-5 p-4">
    <Container>
      <Row>
        <Col md={4} className="mb-4">
          <h5>Contact Us</h5>
          <p>123 Real Estate St, City, Country</p>
          <p>Phone: +1 (234) 567-890</p>
          <p>Email: info@realestate.com</p>
        </Col>
        <Col md={4} className="mb-4">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white">Home</a></li>
            <li><a href="#" className="text-white">About</a></li>
            <li><a href="#" className="text-white">Properties</a></li>
            <li><a href="#" className="text-white">Contact</a></li>
          </ul>
        </Col>
        <Col md={4} className="mb-4">
          <h5>Follow Us</h5>
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
          <p className="mb-0">&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;