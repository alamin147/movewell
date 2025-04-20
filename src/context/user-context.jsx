import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = (email, password) => {
    // In a real app, you'd make an API call
    // For now, simulate a successful login
    setUser({
      id: '1',
      name: 'Alex Johnson',
      email: email || 'alex@example.com',
    })
    return true
  }
  
  const logout = () => {
    setUser(null)
  }
  
  const signup = (userData) => {
    // In a real app, you'd make an API call
    setUser({
      id: '1',
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
    })
    return true
  }
  
  const updateUser = (updatedUserData) => {
    // In a real app, you'd make an API call to update the user
    setUser({
      ...user,
      ...updatedUserData
    })
    return true
  }
  
  return (
    <UserContext.Provider value={{ user, login, logout, signup, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}