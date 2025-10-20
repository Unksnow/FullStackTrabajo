import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1 className="text-center">Bienvenido, <span>{user}</span></h1>
      <p className="text-center">Este es tu perfil de usuario.</p>
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <h3 className="text-center">🛒 Historial de Compras</h3>
      {purchases.length === 0 ? (
        <p className="text-center text-muted">Aún no has realizado compras.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
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