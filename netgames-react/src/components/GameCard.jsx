import React from 'react';

function GameCard({ image, title, price }) {
  const comprarJuego = (juego, precio) => {
    if (localStorage.getItem('sesionIniciada') !== 'true') {
      alert('Debes iniciar sesión para comprar.');
      return;
    }
    
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const historial = JSON.parse(localStorage.getItem('historialCompras')) || {};
    
    if (!historial[usuarioActivo]) {
      historial[usuarioActivo] = [];
    }
    
    const nuevaCompra = {
      producto: juego,
      precio: precio,
      fecha: new Date().toLocaleDateString()
    };

    historial[usuarioActivo].push(nuevaCompra);
    localStorage.setItem('historialCompras', JSON.stringify(historial));
    alert(`${juego} ha sido añadido a tu historial de compras.`);
  };

  return (
    <div className="col-md-3">
      <div className="card juego h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="precio">${price.toLocaleString('es-CL')}</p>
          <button className="btn btn-primary" onClick={() => comprarJuego(title, price)}>Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;