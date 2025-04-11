
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeLocalStorage } from './utils/storage.ts';

// Initialize storage with sample data
initializeLocalStorage();

// Create root
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

// Render app
createRoot(root).render(
  <App />
);
