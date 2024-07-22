import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContextWrapper from './context/AuthContextWrapper.tsx'
import BuilderContextWrapper from './context/BuilderContextWrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthContextWrapper>
        <BuilderContextWrapper>
          <App />
        </BuilderContextWrapper>
      </AuthContextWrapper>
    </Router>
  </React.StrictMode>
)
