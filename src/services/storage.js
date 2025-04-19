// Helper functions to work with local storage

export function getItem(key, defaultValue = null) {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error("Error parsing JSON from localStorage", e);
    return defaultValue;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("Error storing item in localStorage", e);
    return false;
  }
}

// For specific data types
const STORAGE_KEYS = {
  APPOINTMENTS: 'movewell_appointments',
  STATS: 'movewell_stats',
  COMPLETED_EXERCISES: 'movewell_completed_exercises',
};

// Appointments
export function getAppointments() {
  return getItem(STORAGE_KEYS.APPOINTMENTS, []);
}

export function saveAppointment(appointment) {
  const appointments = getAppointments();
  appointment.id = Date.now(); // Simple way to generate unique ID
  appointments.push(appointment);
  return setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
}

export function cancelAppointment(appointmentId) {
  const appointments = getAppointments();
  const filtered = appointments.filter(a => a.id !== appointmentId);
  return setItem(STORAGE_KEYS.APPOINTMENTS, filtered);
}

// Stats
export function getStats() {
  return getItem(STORAGE_KEYS.STATS, {
    currentStreak: 0,
    postureScore: 60,
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0] // One for each day of the week
  });
}

export function updateStats(stats) {
  const currentStats = getStats();
  return setItem(STORAGE_KEYS.STATS, {
    ...currentStats,
    ...stats
  });
}

export function incrementDailyActivity() {
  const stats = getStats();
  // Update activity for the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = new Date().getDay();
  stats.weeklyActivity[dayOfWeek] = 1; // Mark as done for today
  stats.currentStreak += 1;
  return updateStats(stats);
}

// Completed exercises
export function getCompletedExercises() {
  return getItem(STORAGE_KEYS.COMPLETED_EXERCISES, []);
}

export function addCompletedExercise(exercise) {
  const exercises = getCompletedExercises();
  exercises.push({
    ...exercise,
    completedAt: new Date().toISOString()
  });
  return setItem(STORAGE_KEYS.COMPLETED_EXERCISES, exercises);
}