import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/route';
import { ToastContainer } from 'react-toastify';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      theme='dark'
    />
  </React.StrictMode>
);
