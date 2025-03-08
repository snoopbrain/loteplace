import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import './About.css';

const teamMembers = [
  {
    name: 'Snoppy Brown',
    position: 'CEO',
    image: 'https://via.placeholder.com/150',
    bio: 'John tiene más de 20 años de experiencia en la industria inmobiliaria y lidera la empresa con una visión de excelencia.'
  },
  {
    name: 'Johan Smith',
    position: 'COO',
    image: 'https://via.placeholder.com/150',
    bio: 'Jane supervisa todos los aspectos operativos del negocio, asegurando que todo funcione sin problemas y de manera eficiente.'
  },
  {
    name: 'Yolian Jones',
    position: 'CFO',
    image: 'https://via.placeholder.com/150',
    bio: 'Sam gestiona las acciones financieras de la empresa, enfocándose en la rentabilidad y el crecimiento.'
  }
];

const testimonials = [
  {
    name: 'Loquitos de la esquina',
    feedback: 'El equipo de Bienes Raíces fue increíblemente servicial y profesional. ¡Nos ayudaron a encontrar la casa de nuestros sueños!',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.minuto30.com%2Fvuelvete-loco-por-tu-mujer-pero-no-la-mates-contundente-mensaje-de-loquito-republica-dominicana%2F780058%2F&psig=AOvVaw1BJpK9ejiByS4s_rz9ZCiM&ust=1741546349892000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCal-6T-4sDFQAAAAAdAAAAABAE'
  },
  {
    name: 'La vecina',
    feedback: 'Una experiencia maravillosa de principio a fin. ¡Recomiendo mucho sus servicios!',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eldiario.ec%2Fnoticias-manabi-ecuador%2F260932-que-hacer-con-un-vecino-chismoso%2F&psig=AOvVaw0F9b0vemiJpQB9AClbxx_O&ust=1741546398253000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKD78YmU-4sDFQAAAAAdAAAAABAE'
  }
];

const About = () => (
  <Container className="my-5">
    <Row className="mb-4">
      <Col>
        <h1>📌 Sobre Nosotros 📌</h1>
        <p> 
          👨‍💻👩‍💻👨‍💻 Tres estudiantes de ingeniería en sistemas: "Vamos a hacer un proyecto sencillo para la universidad."

          <p>🧠💡 También nosotros: "¿Y si creamos una plataforma inmobiliaria que revolucione la búsqueda de viviendas?"</p> 

          😵‍💻 Después de incontables horas de código, café y bugs inesperados...

          🏡 Bienes Raíces nació como nuestra forma de combinar tecnología e innovación para ayudar a las personas a encontrar su hogar ideal. Puede que aún seamos estudiantes, pero si algo sabemos hacer es programar (y aprender de nuestros errores en el camino). 🚀💻
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>📜 Nuestra Historia 📜</h2>
        <p>
          <p>💡 Profesor: "Tienen que hacer un proyecto académico aplicando lo aprendido en clase."</p>

          <p>👨‍💻👩‍💻👨‍💻 Nosotros: "¿Y si creamos una plataforma de bienes raíces?"</p>

          <p>🔥 También nosotros (sin experiencia, pero con ganas de programar 🤔): "Esto cambiará el mercado inmobiliario para siempre. 🚀"</p>

          ⚙️ Meses después...

          🏡 Bienes Raíces: Un sitio web funcional, intuitivo y listo para ayudarte a encontrar tu hogar ideal. Todo gracias a tres estudiantes de sistemas con más líneas de código que horas de sueño. 😅💻
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>📌 Misión y Visión 📌</h2>
        <p>
          <strong>Misión:</strong> 👨‍💻👩‍💻👨‍💻 Nosotros: "Hagamos un proyecto académico."
          <p>🛠️ También nosotros: "Pero con integridad, profesionalismo y un sitio web que realmente ayude a las personas a encontrar su hogar ideal."</p>
            🏡 Resultado: Un portal inmobiliario hecho con código, café y muchas ganas de innovar.
        </p>
        <p>
          <strong>Visión:</strong> 🤯 "¿Y si terminamos dominando el mercado inmobiliario?"
          <p>🌍 Ser la plataforma líder en bienes raíces, reconocida por hacer la búsqueda de viviendas más fácil, rápida y confiable. Porque si vamos a programar, lo hacemos en grande. 😎💻</p>
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
