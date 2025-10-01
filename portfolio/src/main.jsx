import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initScrollAnimations } from './utils.js'

// Initialize scroll animations when the page loads
window.addEventListener('load', () => {
  initScrollAnimations();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)