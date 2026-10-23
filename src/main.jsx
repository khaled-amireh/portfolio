import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { portfolio } from './data/portfolio'

document.title = portfolio.site.title
document.querySelector('meta[name="description"]').content = portfolio.site.description

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
