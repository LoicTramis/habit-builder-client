import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextWrapper from './context/AuthContextWrapper.tsx'
import HabitContextWrapper from './context/HabitContextWrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <HabitContextWrapper>
          <App />
        </HabitContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
