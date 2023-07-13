import React, { useState } from 'react';
import Login from './components/auth/Login';
import Icons from './components/home/Icons';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '646263942180-6rii0ki94o9k04m4sq5oiefgfcoqadg9.apps.googleusercontent.com'
      })
    }

    gapi.load('client:auth2', start)
  })

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <Icons onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
