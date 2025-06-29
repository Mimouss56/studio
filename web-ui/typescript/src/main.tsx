import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { App } from './App';
import './index.css';

// Configuration de l'application avec destructuration atomique
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Élément root non trouvé');
}

const root = ReactDOM.createRoot(rootElement);

// Rendu de l'application avec destructuration atomique
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 