import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { Router } from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
