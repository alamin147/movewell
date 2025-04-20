import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('movewell_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error parsing stored user data', e)
      }
    }
    setIsLoading(false)
  }, [])
  
  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('movewell_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('movewell_user')
    }
  }, [user])
  
  const login = (email, password) => {
    // In a real app, you'd make an API call
    // For now, simulate a successful login
    const userData = {
      id: '1',
      name: 'Alex Johnson',
      email: email || 'alex@example.com',
    }
    
    setUser(userData)
    return true
  }
  
  const logout = () => {
    setUser(null)
  }
  
  const signup = (userData) => {
    // In a real app, you'd make an API call
    const newUser = {
      id: '1',
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
    }
    
    setUser(newUser)
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
    <UserContext.Provider value={{ user, isLoading, login, logout, signup, updateUser }}>
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