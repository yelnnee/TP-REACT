import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// importation du Router
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  // 👉 On entoure toute l'app avec BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
