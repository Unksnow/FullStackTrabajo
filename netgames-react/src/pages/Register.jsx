import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/estilo.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (existingUsers.find(user => user.nombreUsuario === username)) {
      alert('El nombre de usuario ya está registrado.');
      return;
    }
    if (existingUsers.find(user => user.correo === email)) {
      alert('Este correo electrónico ya está en uso.');
      return;
    }

    const newUser = {
      nombreUsuario: username,
      correo: email,
      password: password
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(existingUsers));

    alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="login-page-container">
      <div className="welcome-banner">
        <span>Registro</span>
      </div>

      <div className="login-card">
        <h2>Registro de Usuario</h2>
        
        <form onSubmit={handleRegister} className="login-form">
          
          <div className="form-group">
            <label htmlFor="nuevoUsuario">Nombre de Usuario</label>
            <input
              type="text"
              id="nuevoUsuario"
              placeholder="Ingresa un nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nuevoCorreo">Correo Electrónico</label>
            <input
              type="email"
              id="nuevoCorreo"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nuevaPassword">Contraseña</label>
            <input
              type="password"
              id="nuevaPassword"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarPassword"
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Registrar
          </button>
          
          <p className="register-link">
            <Link to="/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;