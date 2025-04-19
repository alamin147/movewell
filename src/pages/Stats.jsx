import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight, Trophy, Users, Check } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"
import { useState } from "react"
import { format, isToday } from "date-fns"

// Import achievement icons - these should already exist
import streakIcon from "../assets/icons/streak.svg"
import postureIcon from "../assets/icons/posture.svg"
import exerciseIcon from "../assets/icons/exercise.svg"
import earlyAdopterIcon from "../assets/icons/early-adopter.svg"

export default function StatsPage() {
  const { currentStreak, postureScore, completedExercises, weeklyActivity } = useExercise()
  const [weekOffset, setWeekOffset] = useState(0)
  
  // Get today's completed exercises
  const todayExercises = completedExercises.filter(exercise => 
    isToday(new Date(exercise.completedAt))
  );
  
  // Generate dummy users with ImagePlaceholder rather than importing photos
  const leaderboardUsers = [
    { name: "Sarah K.", score: 95, days: 7 },
    { name: "Mike T.", score: 82, days: 5 },
    { name: "You", score: postureScore, days: currentStreak },
    { name: "Alex W.", score: 65, days: 3 },
    { name: "Jamie L.", score: 60, days: 2 },
  ].sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  
  // Format time from ISO string
  const formatExerciseTime = (isoString) => {
    try {
      return format(new Date(isoString), "h:mm a");
    } catch (e) {
      return "";
    }
  };
  
  // Get days of week based on week offset
  const getDaysOfWeek = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    
    // Start from last Sunday
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - currentDay - (weekOffset * 7));
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push({
        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
        date: date,
        // If current week (offset=0), use weeklyActivity, otherwise simulate data
        active: weekOffset === 0 ? weeklyActivity[i] : Math.random() > 0.5 ? 1 : 0
      });
    }
    
    return days;
  }
  
  const daysOfWeek = getDaysOfWeek();
  
  // Week navigation
  const prevWeek = () => {
    setWeekOffset(weekOffset + 1);
  }
  
  const nextWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset(weekOffset - 1);
    }
  }
  
  // Format week display text
  const getWeekText = () => {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === 1) return "Last Week";
    return `${weekOffset} Weeks Ago`;
  }
  
  // Challenge progress calculations
  const getStreakProgress = () => {
    return Math.min(currentStreak / 7 * 100, 100);
  }
  
  const getPostureProgress = () => {
    return postureScore;
  }
  
  const getExerciseProgress = () => {
    return Math.min(completedExercises.length / 10 * 100, 100);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Progress & Stats</h1>
      </header>

      <Tabs defaultValue="progress" className="w-full">
        <div className="bg-white px-4 py-2 border-b">
          <TabsList className="w-full grid grid-cols-2 h-10">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4 space-y-6 pb-20">
          <TabsContent value="progress" className="mt-0 space-y-6">
            {/* New section: Today's Completed Exercises */}
            {todayExercises.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-medium">Today's Exercises</h2>
                <Card className="p-4">
                  <div className="space-y-3">
                    {todayExercises.map((exercise, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{exercise.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatExerciseTime(exercise.completedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Weekly Summary</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{getWeekText()}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={nextWeek}
                    disabled={weekOffset === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {daysOfWeek.map((day, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-xs text-gray-500">{day.day}</div>
                      <div
                        className={`h-16 rounded-lg flex items-center justify-center ${day.active ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        {day.active ? <Calendar className="h-5 w-5 text-blue-600" /> : null}
                      </div>
                      <div className="text-xs font-medium">{day.active ? "Done" : ""}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium">Your Achievements</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: `${currentStreak}-Day Streak`,
                    icon: <img src={streakIcon} alt="Streak" className="h-6 w-6" />,
                    color: "bg-yellow-100",
                    earned: currentStreak > 0
                  },
                  { 
                    title: completedExercises.length > 0 ? "Exercise Completed" : "First Exercise", 
                    icon: <img src={exerciseIcon} alt="Exercise" className="h-6 w-6" />, 
                    color: "bg-blue-100",
                    earned: completedExercises.length > 0
                  },
                  { 
                    title: postureScore > 75 ? "Posture Pro" : "Posture Improver", 
                    icon: <img src={postureIcon} alt="Posture" className="h-6 w-6" />, 
                    color: "bg-purple-100",
                    earned: postureScore > 60
                  },
                  { 
                    title: "Early Adopter", 
                    icon: <img src={earlyAdopterIcon} alt="Early Adopter" className="h-6 w-6" />, 
                    color: "bg-green-100",
                    earned: true
                  },
                ].map((achievement, i) => (
                  <Card key={i} className={`p-4 ${!achievement.earned ? 'opacity-50' : ''}`}>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`${achievement.color} p-3 rounded-full`}>{achievement.icon}</div>
                      <h3 className="font-medium text-sm">{achievement.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0 space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Weekly Leaderboard</h2>
                <Button variant="outline" size="sm" className="h-8">
                  <Users className="h-4 w-4 mr-1" /> Friends
                </Button>
              </div>

              <div className="space-y-4">
                {leaderboardUsers.map((user, i) => (
                  <div
                    key={i}
                    className={`flex items-center p-3 rounded-lg ${user.name === "You" ? "bg-blue-50 border border-blue-200" : ""}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-500">
                      {user.rank}
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full ml-2 overflow-hidden">
                      <ImagePlaceholder 
                        width={32} 
                        height={32} 
                        text={user.name}
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.days} day streak</div>
                    </div>
                    <div className="font-bold text-blue-600">{user.score}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="font-bold mb-4">Challenges</h2>
              <div className="space-y-4">
                {[
                  { title: "7-Day Streak", progress: getStreakProgress(), reward: "Gold Badge" },
                  { title: "Perfect Posture", progress: getPostureProgress(), reward: "Silver Badge" },
                  { title: "Exercise Master", progress: getExerciseProgress(), reward: "Bronze Badge" },
                ].map((challenge, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{challenge.title}</div>
                      <div className="text-sm text-gray-500">Reward: {challenge.reward}</div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-gray-500">{Math.round(challenge.progress)}% complete</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </main>
      </Tabs>

      <BottomNavigation currentPath="/stats" />
    </div>
  )
}
