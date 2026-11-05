import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// U produkciji HTML je već prerenderovan (scripts/prerender.mjs), pa ga samo "oživljavamo".
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
