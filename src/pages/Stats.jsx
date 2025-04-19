import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Award, Calendar, ChevronLeft, ChevronRight, Trophy, Users } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"

// Import profile images
import avatar1 from "../assets/profiles/avatar1.jpg"
import avatar2 from "../assets/profiles/avatar2.jpg"
import avatar3 from "../assets/profiles/avatar3.jpg"
import avatar4 from "../assets/profiles/avatar4.jpg"
import userAvatar from "../assets/profiles/user-avatar.jpg"

// Import achievement icons
import streakIcon from "../assets/icons/streak.svg"
import postureIcon from "../assets/icons/posture.svg"
import exerciseIcon from "../assets/icons/exercise.svg"
import earlyAdopterIcon from "../assets/icons/early-adopter.svg"

export default function StatsPage() {
  const { currentStreak, postureScore, completedExercises } = useExercise()
  
  const leaderboardUsers = [
    { name: "You", rank: 3, score: postureScore, days: currentStreak, avatar: userAvatar },
    { name: "Sarah K.", rank: 1, score: 95, days: 7, avatar: avatar1 },
    { name: "Mike T.", rank: 2, score: 82, days: 5, avatar: avatar2 },
    { name: "Alex W.", rank: 4, score: 65, days: 3, avatar: avatar3 },
    { name: "Jamie L.", rank: 5, score: 60, days: 2, avatar: avatar4 },
  ].sort((a, b) => a.rank - b.rank);

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
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Weekly Summary</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">This Week</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-xs text-gray-500">{day}</div>
                      <div
                        className={`h-16 rounded-lg flex items-center justify-center ${i < currentStreak ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        {i < currentStreak && <Calendar className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div className="text-xs font-medium">{i < currentStreak ? "Done" : ""}</div>
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
                  },
                  { 
                    title: completedExercises.length > 0 ? "Exercise Completed" : "First Exercise", 
                    icon: <img src={exerciseIcon} alt="Exercise" className="h-6 w-6" />, 
                    color: "bg-blue-100" 
                  },
                  { 
                    title: postureScore > 75 ? "Posture Pro" : "Posture Improver", 
                    icon: <img src={postureIcon} alt="Posture" className="h-6 w-6" />, 
                    color: "bg-purple-100" 
                  },
                  { 
                    title: "Early Adopter", 
                    icon: <img src={earlyAdopterIcon} alt="Early Adopter" className="h-6 w-6" />, 
                    color: "bg-green-100" 
                  },
                ].map((achievement, i) => (
                  <Card key={i} className="p-4">
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
                        imageSrc={user.avatar}
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
                  { title: "7-Day Streak", progress: 43, reward: "Gold Badge" },
                  { title: "Perfect Posture", progress: 65, reward: "Silver Badge" },
                  { title: "Exercise Master", progress: 20, reward: "Bronze Badge" },
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
                    <div className="text-xs text-right text-gray-500">{challenge.progress}% complete</div>
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
