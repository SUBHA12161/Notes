import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context/AuthContext';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>
    <React.StrictMode>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);