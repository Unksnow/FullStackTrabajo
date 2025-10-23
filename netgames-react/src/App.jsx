import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function AppLayout({ isLoggedIn, onLogout }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
function AppRoutes() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sesionIniciada') === 'true';
  });

  const navigate = useNavigate(); 

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sesionIniciada');
    localStorage.removeItem('usuarioActivo');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<AppLayout isLoggedIn={isLoggedIn}/>}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="perfil" element={<Profile onLogout={handleLogout}/>} />
        <Route 
          path="login" 
          element={<Login onLoginSuccess={handleLogin} />} 
        />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes /> 
    </Router>
  );
}

export default App;
