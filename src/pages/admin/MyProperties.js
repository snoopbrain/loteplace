// MyProperties.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getPropertiesByUser, createProperty, deleteProperty } from '../../services/propertiesService';
import { AuthContext } from '../../App';
import './MyProperties.css'; // Tus estilos personalizados (opcional)

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);       // Spinner al obtener propiedades
  const [submitting, setSubmitting] = useState(false); // Spinner al crear propiedad
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    image: null,
  });

  const navigate = useNavigate();

  // Cargar propiedades del usuario
  useEffect(() => {
    if (user && user.id) {
      getPropertiesByUser(user.id)
        .then((data) => {
          if (Array.isArray(data)) {
            setProperties(data);
          } else {
            console.error('La API no devolvió un array:', data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  // Manejo de archivo
  const handleFileChange = (e) => {
    setNewProperty({ ...newProperty, image: e.target.files[0] });
  };

  // Eliminar propiedad
  const handleDelete = async (propertyId) => {
    console.log('Eliminar propiedad con ID:', propertyId);
    if (window.confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      try {
        await deleteProperty(propertyId);
        setProperties(properties.filter((p) => p.id !== propertyId));
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Enviar formulario para crear propiedad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error('No se encontró un usuario autenticado');
      return;
    }

    setSubmitting(true); // Activar spinner de envío

    const formData = new FormData();
    formData.append('title', newProperty.title);
    formData.append('description', newProperty.description);
    formData.append('price', newProperty.price);
    formData.append('location', newProperty.location);
    formData.append('area', newProperty.area);
    formData.append('image', newProperty.image);
    formData.append('usuarioId', user.id);

    try {
      const createdProperty = await createProperty(formData);
      setProperties([...properties, createdProperty]);
      setShowForm(false);
      // Limpiar campos
      setNewProperty({
        title: '',
        description: '',
        price: '',
        location: '',
        area: '',
        image: null,
      });
    } catch (error) {
      console.error('Error al publicar la propiedad:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false); // Desactivar spinner de envío
    }
  };

  // Verificar usuario autenticado
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

      {/* Formulario para publicar nueva propiedad */}
      {showForm && (
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <div className="form-container p-4">
              <h2 className="text-center mb-4">Publicar Nueva Propiedad</h2>
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
                    rows={3}
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
                  <Form.Label>Área (m²)</Form.Label>
                  <Form.Control
                    type="number"
                    name="area"
                    value={newProperty.area}
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

                <div className="text-center">
                  <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Publicando...
                      </>
                    ) : (
                      'Publicar Propiedad'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      )}

      {/* Spinner principal mientras se cargan las propiedades */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando propiedades...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 align-items-stretch">
          {properties.length > 0 ? (
            properties.map((property) => (
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
                    <Card.Text>
                      <strong>Precio:</strong> ${property.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Ubicación:</strong> {property.location}
                    </Card.Text>
                    <div className="mt-auto">
                      <Button
                        as={Link}
                        to={`/properties/${property.id}`}
                        variant="primary"
                        className="me-2"
                      >
                        Más Detalles
                      </Button>
                      <Button variant="warning" className="me-2">
                        Editar
                      </Button>
                      {/* Aquí pasamos property.id correctamente */}
                      <Button
                        onClick={() => handleDelete(property.id)}
                        variant="danger"
                      >
                        Eliminar
                      </Button>
                    </div>
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
