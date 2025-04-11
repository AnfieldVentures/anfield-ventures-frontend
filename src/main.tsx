
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeLocalStorage } from './utils/storage.ts'

// Initialize storage with sample data
initializeLocalStorage();

createRoot(document.getElementById("root")!).render(<App />);
