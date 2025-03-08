import React, { useState, useContext } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { signup } from '../../services/authenticationService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const registerData = await signup(name, email, password, municipality, contact);
      console.log('Usuario registrado:', registerData);
      setUser(registerData);
      navigate('/');
    }catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma tu contraseña"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="municipality">Municipio</label>
          <input
            type="text"
            id="municipality"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            placeholder="Ingresa tu municipio"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="contact">Contacto</label>
          <input
            type="tel"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="(+57)"
            pattern="\d{10}"
            title="El número de contacto debe tener 10 dígitos"
            required
          />
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Registrarse'}
        </button>
        <a href="/login">¿Ya tienes cuenta?, ¡Inicia Sesión!</a>
      </form>
    </div>
  );
};

export default Register;
