// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Estilos para el nuevo header, aplicados directamente
  const headerStyle = {
    backgroundColor: '#60177e', // Mantenemos el color púrpura
    padding: '20px 40px',     // Añadimos un poco de espacio
  };

  const listStyle = {
    listStyleType: 'disc',  // Para mostrar los puntos (viñetas)
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  return (
    <header style={headerStyle}>
      {/* El logo "NetGames" es opcional, ya que no aparece en la imagen 2 */}
      {/* <h1 style={{color: 'white', margin: 0, marginBottom: '10px'}}>NetGames</h1> */}
      <nav>
        <ul style={listStyle}>
          <li><Link to="/" style={linkStyle}>Inicio</Link></li>
          <li><Link to="/catalogo" style={linkStyle}>Catalogo</Link></li>
          <li><Link to="/perfil" style={linkStyle}>Perfil</Link></li>
          <li><Link to="/login" style={linkStyle}>Login</Link></li>
          <li><Link to="/register" style={linkStyle}>Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;