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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
