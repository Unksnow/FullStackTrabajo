// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
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
    <main className="container mt-5">
      <h1 className="text-center">Iniciar Sesión</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="UserLabel" className="form-label">Usuario o Correo</label>
            <input 
              type="text" 
              className="form-control" 
              id="UserLabel" 
              placeholder="Ingresa tu usuario o correo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword6" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="inputPassword6" 
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleLogin}>Iniciar Sesión</button>
          <div className="text-center mt-3">
            <Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;