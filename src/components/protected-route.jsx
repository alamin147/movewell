import { Navigate } from "react-router-dom"
import { useUser } from "../context/user-context"

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser()
  
  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}