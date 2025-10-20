import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/estilo.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('sesionIniciada') === 'true';
    const activeUser = localStorage.getItem('usuarioActivo');

    if (!isLoggedIn || !activeUser) {
      alert('Debes iniciar sesión para ver tu perfil.');
      navigate('/login');
      return;
    }

    setUser(activeUser);
    const history = JSON.parse(localStorage.getItem('historialCompras')) || {};
    setPurchases(history[activeUser] || []);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sesionIniciada');
    localStorage.removeItem('usuarioActivo');
    navigate('/login');
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-welcome">Bienvenido, <span>{user}</span></h1>
      <p className="profile-subtitle">Este es tu perfil de usuario.</p>
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>

      <h3 className="history-title">
        🛒 Historial de Compras
      </h3>
      {purchases.length === 0 ? (
        <p className="no-purchases">Aún no has realizado compras.</p>
      ) : (
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((compra, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{compra.producto}</td>
                  <td>${compra.precio.toLocaleString('es-CL')}</td>
                  <td>{compra.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Profile;