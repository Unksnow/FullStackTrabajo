// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Un layout para que el Header aparezca en todas las páginas
function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizará el componente de la ruta actual */}
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
