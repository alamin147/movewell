import { createContext, useContext, useState, useEffect } from "react";
import { isToday, isSameDay, differenceInCalendarDays } from "date-fns";

const ExerciseContext = createContext();

export function ExerciseProvider({ children }) {
  const [completedExercises, setCompletedExercises] = useState(() => {
    const saved = localStorage.getItem("completedExercises");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentStreak, setCurrentStreak] = useState(0);
  const [postureScore, setPostureScore] = useState(70);
  const [weeklyActivity, setWeeklyActivity] = useState([0, 0, 0, 0, 0, 0, 0]);

  // Calculate streak based on consecutive days with exercises
  useEffect(() => {
    if (completedExercises.length === 0) {
      setCurrentStreak(0);
      return;
    }

    // Group exercises by date (YYYY-MM-DD format)
    const exercisesByDate = completedExercises.reduce((acc, exercise) => {
      const date = new Date(exercise.completedAt);
      const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(exercise);
      return acc;
    }, {});

    // Get unique dates when exercises were completed
    const uniqueDates = Object.keys(exercisesByDate).map(dateStr => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    }).sort((a, b) => b - a); // Sort dates in descending order (newest first)

    // Calculate streak
    let streak = 0;
    const today = new Date();
    
    // Check if there's an exercise today
    const hasExerciseToday = uniqueDates.length > 0 && 
                             isSameDay(uniqueDates[0], today);
    
    if (!hasExerciseToday) {
      // If no exercise today, check if there was one yesterday to continue the streak
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      
      const hasExerciseYesterday = uniqueDates.length > 0 && 
                                  isSameDay(uniqueDates[0], yesterday);
                                  
      if (!hasExerciseYesterday) {
        setCurrentStreak(0);
        return;
      }
    }
    
    // Count consecutive days
    for (let i = 0; i < uniqueDates.length; i++) {
      if (i === 0) {
        streak = 1;
        continue;
      }
      
      const currentDate = uniqueDates[i-1];
      const previousDate = uniqueDates[i];
      
      // Check if dates are consecutive
      const daysDifference = differenceInCalendarDays(currentDate, previousDate);
      
      if (daysDifference === 1) {
        streak++;
      } else {
        break; // Streak is broken
      }
    }
    
    setCurrentStreak(streak);
  }, [completedExercises]);

  // Update weekly activity when exercises change
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Initialize the week with zeros
    const newWeeklyActivity = [0, 0, 0, 0, 0, 0, 0];
    
    // Group exercises by day of the week
    completedExercises.forEach(exercise => {
      const date = new Date(exercise.completedAt);
      
      // Check if the exercise was completed this week
      const dayDiff = differenceInCalendarDays(today, date);
      if (dayDiff >= 0 && dayDiff < 7) {
        const exerciseDay = date.getDay();
        newWeeklyActivity[exerciseDay] = 1; // Mark this day as active
      }
    });
    
    setWeeklyActivity(newWeeklyActivity);
  }, [completedExercises]);

  useEffect(() => {
    localStorage.setItem("completedExercises", JSON.stringify(completedExercises));
  }, [completedExercises]);

  const completeExercise = (exercise) => {
    // Check if exercise is a string (just the name) or an object
    const newExercise = typeof exercise === 'string' 
      ? {
          name: exercise,  // Use the string as the name
          id: Date.now(),  // Generate a unique ID
          completedAt: new Date().toISOString()
        }
      : {
          ...exercise,
          completedAt: new Date().toISOString()
        };
    
    setCompletedExercises(prev => [...prev, newExercise]);
    
    // Update posture score when exercise is completed (simulate improvement)
    setPostureScore(prev => Math.min(prev + Math.floor(Math.random() * 5) + 1, 100));
  };

  return (
    <ExerciseContext.Provider
      value={{
        completedExercises,
        completeExercise,
        currentStreak,
        postureScore,
        weeklyActivity
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export const useExercise = () => useContext(ExerciseContext);