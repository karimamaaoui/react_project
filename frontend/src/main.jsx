import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react';
import 'jsvectormap';
import 'flatpickr';
import './styles/satoshi.css';
import './styles/style.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>

      <App />

      <ToastContainer />
      </AuthProvider>
  </React.StrictMode>,
)
