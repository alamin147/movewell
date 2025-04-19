import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import all pages
import WelcomePage from './pages/App'
import OnboardingPage from './pages/Onboarding'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import ExercisesPage from './pages/Exercise'
import StatsPage from './pages/Stats'
import ProfilePage from './pages/Profile'
import ProtectedRoute from './components/protected-route'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exercises" 
          element={
            <ProtectedRoute>
              <ExercisesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/stats" 
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
