import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Tus componentes
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'; 

function App() {
  return (
    <Router>
      {/* El Header se muestra en todas las páginas */}
      <Header /> 

      <Routes>
        {/* Redirigir la raíz "/" a "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route path="/home" element={<Home />} />
        
        {/* Ruta del catálogo */}
        <Route path="/catalog" element={<Catalog />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta de perfil (si la tienes creada) */}
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;