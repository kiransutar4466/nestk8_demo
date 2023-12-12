import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/route';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
