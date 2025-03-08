import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { getPropertiesByUser } from '../../services/propertiesService';
import "./admin.css"

const AdminProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getPropertiesByUser(user.id);
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [user]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(price);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center properties-list">
        <p>Cargando propiedades...</p>
      </Container>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="my-5 properties-list">
      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {properties.map((property) => (
          <Col key={property.id}>
            <Card className="property-card h-100">
              <Card.Img
                variant="top"
                src={property.image}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-primary">{property.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">{property.description}</Card.Text>
                <Card.Text className="font-weight-bold">{formatPrice(property.price)}</Card.Text>
                <Card.Text className="text-secondary">{property.location}</Card.Text>
                <Button as={Link} to={`/properties/${property.id}`} variant="outline-primary" className="mt-auto">
                  Más Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminProperties;