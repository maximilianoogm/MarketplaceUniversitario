import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.jsx';

import { AuthProvider } from './modulo1/context/AuthContext';

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>

  </StrictMode>

);