import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';

const teamMembers = [
  {
    name: 'John Doe',
    position: 'CEO',
    image: 'https://via.placeholder.com/150',
    bio: 'John tiene más de 20 años de experiencia en la industria inmobiliaria y lidera la empresa con una visión de excelencia.'
  },
  {
    name: 'Jane Smith',
    position: 'COO',
    image: 'https://via.placeholder.com/150',
    bio: 'Jane supervisa todos los aspectos operativos del negocio, asegurando que todo funcione sin problemas y de manera eficiente.'
  },
  {
    name: 'Sam Wilson',
    position: 'CFO',
    image: 'https://via.placeholder.com/150',
    bio: 'Sam gestiona las acciones financieras de la empresa, enfocándose en la rentabilidad y el crecimiento.'
  }
];

const testimonials = [
  {
    name: 'Emily Brown',
    feedback: 'El equipo de Bienes Raíces fue increíblemente servicial y profesional. ¡Nos ayudaron a encontrar la casa de nuestros sueños!',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Michael Johnson',
    feedback: 'Una experiencia maravillosa de principio a fin. ¡Recomiendo mucho sus servicios!',
    image: 'https://via.placeholder.com/150'
  }
];

const About = () => (
  <Container className="my-5">
    <Row className="mb-4">
      <Col>
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenido a Bienes Raíces, tu socio de confianza para encontrar el hogar perfecto. Con más de dos décadas de experiencia, hemos ayudado a muchas personas a encontrar su casa ideal con facilidad y confianza.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Nuestra Historia</h2>
        <p>
          Fundada en el año 2000, Bienes Raíces ha pasado de ser una pequeña agencia local a una empresa reconocida a nivel nacional. Nuestro compromiso con la excelencia y la satisfacción del cliente ha sido la clave de nuestro éxito.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Misión y Visión</h2>
        <p>
          <strong>Misión:</strong> Brindar servicios inmobiliarios excepcionales con integridad, profesionalismo y respeto hacia nuestros clientes y la comunidad.
        </p>
        <p>
          <strong>Visión:</strong> Ser la empresa líder en bienes raíces, reconocida por transformar vidas a través de un servicio excepcional y un firme compromiso con la excelencia.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Conoce a Nuestro Equipo</h2>
        <Row>
          {teamMembers.map(member => (
            <Col key={member.name} sm={12} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={member.image} />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
                  <Card.Text>{member.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Testimonios</h2>
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Img variant="top" src={testimonial.image} className="rounded-circle w-25 mb-3" />
                  <Card.Text className="blockquote mb-0">
                    "{testimonial.feedback}"
                  </Card.Text>
                  <footer className="blockquote-footer mt-2">{testimonial.name}</footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  </Container>
);

export default About;
