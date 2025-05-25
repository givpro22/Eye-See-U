import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './navigation/Router';
import { AuthProvider } from './contexts/AuthContext';
import { GazeProvider } from './contexts/GazeContext';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <GazeProvider>
          <Router />
        </GazeProvider>
      </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
