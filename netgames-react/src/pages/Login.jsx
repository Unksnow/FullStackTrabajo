import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/estilo.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!usuario || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosGuardados.find(
      u => (u.nombreUsuario === usuario || u.correo === usuario) && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem('sesionIniciada', 'true');
      localStorage.setItem('usuarioActivo', usuarioEncontrado.nombreUsuario);
      alert('Inicio de sesión exitoso');
      navigate('/perfil'); // Redirige al perfil
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page-container">
      <div className="welcome-banner">
        <span>Bienvenido</span>
      </div>

      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Usuario o Correo</label>
            <input
              type="text"
              id="email" 
              placeholder="Ingresa tu usuario o correo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password" 
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? 
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;