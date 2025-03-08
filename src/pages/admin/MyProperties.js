// MyProperties.js (Layout estándar)
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPropertiesByUser, createProperty } from '../../services/propertiesService';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      getPropertiesByUser(user.id)
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
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProperty({ ...newProperty, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error('No se encontró un usuario autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('title', newProperty.title);
    formData.append('description', newProperty.description);
    formData.append('price', newProperty.price);
    formData.append('location', newProperty.location);
    formData.append('image', newProperty.image);
    formData.append('usuarioId', user.id);

    try {
      const createdProperty = await createProperty(formData);
      setProperties([...properties, createdProperty]);
      setShowForm(false);
      setNewProperty({ title: '', description: '', price: '', location: '', image: null });
    } catch (error) {
      console.error('Error al publicar la propiedad:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!user) {
    console.error('No se encontró un usuario autenticado');
    navigate('/login');
    return null;
  }

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Mis Propiedades</h1>
          <p>Aquí puedes ver todas las propiedades que tienes registradas y publicar nuevas.</p>
          <Button variant="success" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Ocultar Formulario' : 'Publicar Nueva Propiedad'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row>
          <Col md={6} className="mb-4">
            <h2>Publicar Nueva Propiedad</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newProperty.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newProperty.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProperty.price}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={newProperty.location}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Publicar Propiedad
              </Button>
            </Form>
          </Col>
        </Row>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 align-items-stretch">
          {properties.length > 0 ? (
            properties.map(property => (
              <Col key={property.id} className="d-flex">
                <Card className="h-100 w-100 d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={property.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text className="flex-grow-1">{property.description}</Card.Text>
                    <Card.Text><strong>Precio:</strong> ${property.price}</Card.Text>
                    <Card.Text><strong>Ubicación:</strong> {property.location}</Card.Text>
                    <Button as={Link} to={`/properties/${property.id}`} variant="primary" className="mt-auto">
                      Más Detalles
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No tienes propiedades registradas.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default MyProperties;
