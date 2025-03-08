import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; 
import { AuthContext } from '../App';



const NavigationBar = () => {
  const {user, setUser} = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar" style={{ fontSize: '1.25rem' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.5rem' }}>Bienes Raíces</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontSize: '1.25rem' }}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ fontSize: '1.25rem' }}>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/properties" style={{ fontSize: '1.25rem' }}>Propiedades</Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/MyProperties" style={{ fontSize: '1.25rem' }}>Tus Propiedades</Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact" style={{ fontSize: '1.25rem' }}>Contacto</Nav.Link>
          </Nav>
          <Nav className="social-icons">
            {user && (
              <Nav.Link className="user-profile" style={{ fontSize: '1.25rem' }}>
                <FaUserCircle className="user-icon" /> {user.name}
              </Nav.Link>
            )}
            <Nav.Link href="/login">
              {user ? (
                <Button variant="outline-light" className="elegant-button styled-button" >Logout</Button>
              ) : (
                <Button variant="outline-light" className="elegant-button styled-button" >Login</Button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
