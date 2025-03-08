import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getPropertiesByUser, createProperty, deleteProperty, updateProperty } from '../../services/propertiesService';
import { AuthContext } from '../../App';
import './MyProperties.css';

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editedProperty, setEditedProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
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

  // Manejo de inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  // Abrir el modal de edición con los datos actuales de la propiedad
  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditedProperty({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      area: property.area,
    });
    setShowEditModal(true);
  };

  // Guardar los cambios en la propiedad
  const handleSaveEdit = async () => {
    if (!selectedProperty) return;

    try {
      const updatedProperty = await updateProperty(selectedProperty.id, editedProperty);
      setProperties(properties.map((prop) => (prop.id === selectedProperty.id ? updatedProperty : prop)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar la propiedad:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Eliminar propiedad
  const handleDelete = async (propertyId) => {
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
          <p>Aquí puedes ver todas las propiedades que tienes registradas y editar o eliminar las que desees.</p>
        </Col>
      </Row>

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
                      <Button variant="warning" className="me-2" onClick={() => handleEdit(property)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(property.id)}>
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

      {/* Modal de edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedProperty.title}
                onChange={handleEditInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedProperty.description}
                onChange={handleEditInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedProperty.price}
                onChange={handleEditInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={editedProperty.location}
                onChange={handleEditInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Área (m²)</Form.Label>
              <Form.Control
                type="number"
                name="area"
                value={editedProperty.area}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProperties;
