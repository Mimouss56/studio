import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

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