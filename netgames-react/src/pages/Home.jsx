import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="categorias">
        <div className="categoria">
          <img src="/img/Shooters.jpg" alt="Juegos shooter"/>
          <div className="tituloscat">
              <h2>SHOOTERS</h2>
              <p>Sumérgete en intensas batallas...</p>
              <Link to="/catalogo" className="btn-more">Ver más</Link>
          </div>
        </div>

        <div className="categoria">
            <img src="/img/Rol1.jpg" alt="Juegos de rol"/>
            <div className="contenido">
                <h2>JUEGOS DE ROL</h2>
                <p>Te invitamos a que experimentes mundos exóticos...</p>
                <Link to="/catalogo" className="btn-more">Ver más</Link>
            </div>
        </div>

        <div className="categoria">
            <img src="/img/casual.jpg" alt="Videojuegos casuales"/>
            <div className="contenido">
                <h2>VIDEOJUEGOS CASUALES</h2>
                <p>Una colección de juegos únicos y peculiares...</p>
                <Link to="/catalogo" className="btn-more">Ver más</Link>
            </div>
        </div>
      </section>

      <section>
          <h2>Reseñas de Clientes</h2>
          <div className="reseñas">
              <div className="reseña">
                  <p>⭐️⭐️⭐️⭐️⭐️</p>
                  <p>"Compré un juego y llegó instantáneamente, excelente servicio."</p>
                  <small>- Juan Pérez</small>
              </div>
              <div className="reseña">
                  <p>⭐️⭐️⭐️⭐️</p>
                  <p>"Gran variedad de títulos y precios muy buenos, recomendado."</p>
                  <small>- María Gómez</small>
              </div>
              <div className="reseña">
                  <p>⭐️⭐️⭐️⭐️⭐️</p>
                  <p>"Me sorprendió lo rápido y fácil que fue comprar, 10/10."</p>
                  <small>- Carlos Ramírez</small>
              </div>
          </div>
      </section>

      <section>
          <h2>Quiénes Somos</h2>
          <p>
              En <strong>NetGames</strong> somos apasionados por los videojuegos y queremos acercar
              a cada jugador los mejores títulos al mejor precio. Nuestra misión es
              ofrecer una experiencia rápida, segura y accesible para todos los gamers.
          </p>
      </section>
    </>
  );
}

export default Home;