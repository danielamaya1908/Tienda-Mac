import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import Product from './components/Product/Product'; 

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginAdmin onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
