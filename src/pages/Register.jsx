import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/estilo.css';
import api from '../api/axiosConfig'; // <--- 1. IMPORTANTE: Importamos la conexión

function Register() {
    // Estados para el formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Estado para feedback visual
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        // 2. VALIDACIÓN FRONTEND
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            // 3. CONEXIÓN REAL CON SPRING BOOT
            // Enviamos los datos al endpoint que creamos en AuthController.java
            const response = await api.post('/auth/signup', {
                username: username,
                email: email,
                password: password,
                role: ["user"] // Asignamos el rol de usuario por defecto
            });

            console.log("Respuesta del servidor:", response.data);

            // 4. ÉXITO
            alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
            navigate('/login');

        } catch (err) {
            console.error("Error al registrar:", err);

            // Manejo de errores que vienen del Backend (ej: "Error: Email is already in use!")
            if (err.response && err.response.data) {
                // A veces el backend manda un objeto { message: "..." } o un string directo
                const mensajeError = err.response.data.message || err.response.data;
                setError(typeof mensajeError === 'string' ? mensajeError : 'Error al registrar usuario.');
                alert(typeof mensajeError === 'string' ? mensajeError : 'Error al registrar usuario.');
            } else {
                setError('Error de conexión con el servidor.');
                alert('Error de conexión con el servidor.');
            }
        }
    };

    return (
        <div className="login-page-container">
            <div className="welcome-banner">
                <span>Registro</span>
            </div>

            <div className="login-card">
                <h2>Registro de Usuario</h2>
                
                {/* Mensaje de error visual (opcional) */}
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

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

                    <div className="register-link">
                        <Link to="/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;