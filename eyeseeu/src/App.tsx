// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './navigation/Router';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
