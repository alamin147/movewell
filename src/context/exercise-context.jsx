import { createContext, useContext, useState, useEffect } from 'react'
import { getStats, updateStats, getCompletedExercises, addCompletedExercise, incrementDailyActivity } from '../services/storage'

const ExerciseContext = createContext(null)

export function ExerciseProvider({ children }) {
  const [completedExercises, setCompletedExercises] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [postureScore, setPostureScore] = useState(60)
  const [weeklyActivity, setWeeklyActivity] = useState([0, 0, 0, 0, 0, 0, 0])
  
  // Load data from local storage on component mount
  useEffect(() => {
    const stats = getStats();
    setCurrentStreak(stats.currentStreak);
    setPostureScore(stats.postureScore);
    setWeeklyActivity(stats.weeklyActivity);
    
    const exercises = getCompletedExercises();
    setCompletedExercises(exercises);
  }, []);
  
  const completeExercise = (exerciseName) => {
    const now = new Date()
    const newExercise = {
      name: exerciseName,
      completedAt: now.toISOString(),
    };
    
    addCompletedExercise(newExercise);
    setCompletedExercises([...completedExercises, newExercise]);
    
    // Update streak and activity
    incrementDailyActivity();
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    
    // Improve posture score slightly with each exercise
    const newScore = Math.min(postureScore + 2, 100);
    setPostureScore(newScore);
    updateStats({ postureScore: newScore, currentStreak: newStreak });
  }
  
  const updatePostureScore = (newScore) => {
    setPostureScore(newScore);
    updateStats({ postureScore: newScore });
  }
  
  return (
    <ExerciseContext.Provider value={{ 
      completedExercises, 
      currentStreak,
      postureScore,
      weeklyActivity,
      updatePostureScore,
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