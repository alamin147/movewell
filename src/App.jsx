import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import all pages
import WelcomePage from './pages/App'
import OnboardingPage from './pages/Onboarding'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import ExercisesPage from './pages/Exercise'
import DoctorsPage from './pages/Doctors'
import StatsPage from './pages/Stats'
import ProfilePage from './pages/Profile'
import LivePosturePage from './pages/LivePosture'
import AiChatPage from './pages/AiChat'
import ProtectedRoute from './components/protected-route'
import { AppointmentProvider } from './context/appointment-context'

function App() {
  return (
    <AppointmentProvider>
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
            path="/doctors" 
            element={
              <ProtectedRoute>
                <DoctorsPage />
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
          <Route 
            path="/posture" 
            element={
              <ProtectedRoute>
                <LivePosturePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <AiChatPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AppointmentProvider>
  )
}

export default App
