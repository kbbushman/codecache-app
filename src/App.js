import React, { useState } from 'react';
import MainLayout from './components/shared/MainLayout';
import Routes from './config/routes';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem('token') && true,
    token: localStorage.getItem('token'),
  });

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setCurrentUser({isLoggedIn: true, token});
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser({isLoggedIn: false, token: null});
  };

  return (
    <MainLayout currentUser={currentUser} logout={handleLogout}>
      <Routes
        currentUser={currentUser}
        handleLogin={handleLogin}
      />
    </MainLayout>
  );
};

export default App;
