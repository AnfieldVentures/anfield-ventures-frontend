
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initializeLocalStorage } from './utils/storage.js';

// Initialize storage with sample data
initializeLocalStorage();

// Create root
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

// Render app
createRoot(root).render(
  <App />
);
