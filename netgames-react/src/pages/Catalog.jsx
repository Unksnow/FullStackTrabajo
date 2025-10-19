import React from 'react';
import GameCard from '../components/GameCard';

const games = [
  {
    title: 'Red Dead Redemption 2',
    price: 9990,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643'
  },
  {
    title: 'Cyberpunk 2077',
    price: 29990,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg'
  },
  {
    title: 'GTA V',
    price: 15990,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg?t=1753979045'
  },
  {
    title: 'ELDEN RING',
    price: 39990,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1748630546'
  }
];

function Catalog() {
  return (
    <main className="container my-4">
      <h2 className="text-center mb-4">Catálogo de Juegos</h2>
      <div className="row g-4 catalogo">
        {games.map((game, index) => (
          <GameCard 
            key={index}
            title={game.title}
            price={game.price}
            image={game.image}
          />
        ))}
      </div>
    </main>
  );
}

export default Catalog;