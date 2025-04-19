import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/user-context'
import { ExerciseProvider } from './context/exercise-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ExerciseProvider>
        <App />
      </ExerciseProvider>
    </UserProvider>
  </StrictMode>,
)
