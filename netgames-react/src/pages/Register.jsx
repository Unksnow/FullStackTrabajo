import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Registro de Usuario</h1>
          <form onSubmit={handleRegister} className="mt-4">
            <div className="mb-3">
              <label htmlFor="nuevoUsuario" className="form-label">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
                id="nuevoUsuario"
                placeholder="Ingresa un nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nuevoCorreo" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="nuevoCorreo"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nuevaPassword" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="nuevaPassword"
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="confirmarPassword"
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
            
            <div className="text-center mt-3">
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;