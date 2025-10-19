// src/components/Header.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#60177e' }} data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NetGames</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogo">Catalogo</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/perfil">Perfil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;