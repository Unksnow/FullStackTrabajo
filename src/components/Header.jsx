import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    // 1. LÓGICA: Recuperar datos de la sesión del navegador
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    
    // Verificamos si es admin (convertimos el texto JSON a array)
    let isAdmin = false;
    if (roles) {
        try {
            const parsedRoles = JSON.parse(roles);
            // El backend envía "ROLE_ADMIN" o "ROLE_USER"
            isAdmin = parsedRoles.includes('ROLE_ADMIN'); 
        } catch (e) {
            console.error("Error leyendo roles", e);
        }
    }

    // 2. FUNCIÓN: Cerrar Sesión
    const handleLogout = () => {
        // Borramos las llaves
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioActivo');
        localStorage.removeItem('roles');
        localStorage.removeItem('sesionIniciada');
        
        // Redirigimos al Login y recargamos la página para limpiar memoria
        navigate('/login');
        window.location.reload(); 
    };

    // 3. ESTILOS (Inline styles para que funcione rápido sin configurar CSS)
    const headerStyle = {
        backgroundColor: '#60177e', // Tu color morado
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
    };

    const navStyle = {
        display: 'flex',
        listStyle: 'none',
        gap: '20px',
        margin: 0,
        padding: 0,
        alignItems: 'center'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '5px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    };

    return (
        <header style={headerStyle}>
            {/* LOGO */}
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <Link to="/home" style={linkStyle}>NetGames</Link>
            </div>

            {/* NAVEGACIÓN */}
            <nav>
                <ul style={navStyle}>
                    <li><Link to="/home" style={linkStyle}>Inicio</Link></li>
                    <li><Link to="/catalog" style={linkStyle}>Catálogo</Link></li>
                    <li><Link to="/profile" style={linkStyle}>Profile</Link></li>

                    {/* Solo visible para ADMIN */}
                    {isAdmin && (
                        <li><Link to="/admin" style={{...linkStyle, color: '#ffcc00'}}>Panel Admin</Link></li>
                    )}

                    {/* Lógica de Sesión */}
                    {token ? (
                        <>
                            {/* Si hay sesión iniciada */}
                            <li><span style={{fontSize: '0.9rem'}}>Hola, {localStorage.getItem('usuarioActivo')}</span></li>
                            <li>
                                <button onClick={handleLogout} style={buttonStyle}>
                                    Salir
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Si NO hay sesión */}
                            <li><Link to="/login" style={linkStyle}>Login</Link></li>
                            <li><Link to="/register" style={linkStyle}>Registro</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;