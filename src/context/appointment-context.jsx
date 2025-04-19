import { createContext, useContext, useState, useEffect } from 'react'
import { getAppointments, saveAppointment, cancelAppointment } from '../services/storage'

const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Load appointments on component mount
  useEffect(() => {
    const storedAppointments = getAppointments();
    setAppointments(storedAppointments);
    setLoading(false);
  }, [])
  
  const bookAppointment = (appointmentData) => {
    const success = saveAppointment(appointmentData);
    if (success) {
      setAppointments([...appointments, { ...appointmentData, id: Date.now() }]);
    }
    return success;
  }
  
  const removeAppointment = (appointmentId) => {
    const success = cancelAppointment(appointmentId);
    if (success) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
    return success;
  }
  
  return (
    <AppointmentContext.Provider value={{ 
      appointments,
      loading,
      bookAppointment,
      removeAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (context === null) {
    throw new Error('useAppointments must be used within an AppointmentProvider')
  }
  return context
}