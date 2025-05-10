import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './navigation/Router';
import { AuthProvider } from './contexts/AuthContext';
import { GazeProvider } from './contexts/GazeContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GazeProvider>
          <Router />
        </GazeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
