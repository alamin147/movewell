import { createContext, useContext, useState } from 'react'

const ExerciseContext = createContext(null)

export function ExerciseProvider({ children }) {
  const [completedExercises, setCompletedExercises] = useState([])
  const [currentStreak, setCurrentStreak] = useState(3) // Mock data
  const [postureScore, setPostureScore] = useState(78) // Mock data
  
  const completeExercise = (exerciseName) => {
    const now = new Date()
    setCompletedExercises([
      ...completedExercises,
      {
        name: exerciseName,
        completedAt: now.toISOString(),
      }
    ])
    
    // Update streak
    setCurrentStreak(currentStreak + 1)
    
    // Improve posture score slightly with each exercise
    setPostureScore(Math.min(postureScore + 2, 100))
  }
  
  return (
    <ExerciseContext.Provider value={{ 
      completedExercises, 
      currentStreak,
      postureScore,
      setPostureScore,
      completeExercise 
    }}>
      {children}
    </ExerciseContext.Provider>
  )
}

export function useExercise() {
  const context = useContext(ExerciseContext)
  if (context === null) {
    throw new Error('useExercise must be used within an ExerciseProvider')
  }
  return context
}