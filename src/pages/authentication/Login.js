import React, { useState, useContext } from 'react';
import './Login.css';
import { login } from '../../services/authenticationService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'; 
import Logout from './Logout';
const Login = () => {
  const {user, setUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Muestra el spinner

    try {
      const userData = await login(email, password);
      console.log('Usuario autenticado:', userData);
      setUser(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Oculta el spinner
    }
  };

  if (user) {
    return <Logout />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {/* Mostrar mensaje de error con estilo */}
        {error && <div className="error-message">{error}</div>}

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

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Entrar'}
        </button>

        <a href="/register" className="register-link">
          ¿No tienes cuenta todavía? ¡Regístrate!
        </a>
      </form>
    </div>
  );
};

export default Login;
