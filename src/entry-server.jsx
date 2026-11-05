import { renderToString } from 'react-dom/server'
import App from './App.jsx'
export { structuredData } from './seo.js'

export function render() {
  return renderToString(<App />)
}
