import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/estilo.css';
import api from '../api/axiosConfig';

function Login({ onLoginSuccess }) {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado extra para mensajes de error
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        if (!usuario || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            // 1. PETICIÓN REAL AL BACKEND
            // Enviamos "username" porque así lo pide el Backend (LoginRequest.java)
            const response = await api.post('/auth/signin', {
                username: usuario, 
                password: password
            });

            console.log("Respuesta del servidor:", response.data);

            // 2. GUARDAR SESIÓN
            // El backend devuelve: { token, type, id, username, email, roles }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuarioActivo', response.data.username);
            localStorage.setItem('roles', JSON.stringify(response.data.roles));
            localStorage.setItem('sesionIniciada', 'true');

            // 3. NOTIFICAR Y REDIRIGIR
            alert('¡Inicio de sesión exitoso!');
            
            // Si tu App.jsx usa esta función para actualizar el estado global
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            navigate('/profile'); // O redirige a '/home' si prefieres

        } catch (err) {
            console.error("Error en login:", err);
            
            // Manejo de errores (si el backend dice 401 Unauthorized)
            if (err.response && err.response.status === 401) {
                setError('Usuario o contraseña incorrectos.');
                alert('Usuario o contraseña incorrectos.');
            } else {
                setError('Error al conectar con el servidor.');
                alert('Error al conectar con el servidor.');
            }
        }
    };

    return (
        <div className="login-page-container">
            <div className="welcome-banner">
                <span>Bienvenido</span>
            </div>

            <div className="login-card">
                <h2>Iniciar Sesión</h2>

                {/* Mostrar mensaje de error si existe */}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Usuario</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Ingresa tu usuario"
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

                <div className="register-link">
                    <p>¿No tienes cuenta?</p>
                    <Link to="/register">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;