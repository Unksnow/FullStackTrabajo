import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn }) {

  const headerStyle = {
    backgroundColor: '#60177e', 
    padding: '20px 40px',    
  };

  const listStyle = {
    display: 'flex',
    listStyleType: 'none',
    gap: '30px',
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
      <nav>
        <ul style={listStyle}>
          
          <li><Link to="/" style={linkStyle}>Inicio</Link></li>
          <li><Link to="/catalogo" style={linkStyle}>Catalogo</Link></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/perfil" style={linkStyle}>Perfil</Link></li>
            </>

          ) : (
            <>
              <li><Link to="/login" style={linkStyle}>Login</Link></li>
              <li><Link to="/register" style={linkStyle}>Register</Link></li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}

export default Header;