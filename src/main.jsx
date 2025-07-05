// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Routing
import { BrowserRouter } from 'react-router-dom'

// Components
import App from './App.jsx'

// Styles
import './main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
