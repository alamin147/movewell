import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Bell, Calendar, Info, Play } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"

export default function HomePage() {
  const { postureScore, currentStreak } = useExercise()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold text-blue-600">MoveWell</h1>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20">
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Posture Analysis</h2>
            <Button variant="ghost" size="sm" className="h-8 text-blue-600">
              <Info className="h-4 w-4 mr-1" /> How it works
            </Button>
          </div>

          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Posture</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {postureScore > 80 ? "Excellent" : postureScore > 60 ? "Good" : "Needs Work"}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Score</p>
                <h3 className="text-2xl font-bold text-blue-600">{postureScore}/100</h3>
              </div>
            </div>

            <Progress value={postureScore} className="h-2 bg-gray-200" />

            <div className="pt-2">
              <Link to="/exercises">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Exercise Session</Button>
              </Link>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-gray-900">Today's Activity</h2>
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Daily Streak</h3>
                <p className="text-sm text-gray-500">Keep it up!</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-gray-900">Recommended Exercises</h2>
          <div className="space-y-3">
            {["Neck Stretches", "Lower Back Relief", "Shoulder Mobility"].map((exercise, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-lg h-14 w-14 flex items-center justify-center">
                    <ImagePlaceholder width={56} height={56} text={exercise} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{exercise}</h3>
                    <p className="text-sm text-gray-500">5 min • Beginner</p>
                  </div>
                  <Link to="/exercises">
                    <Button size="icon" variant="ghost" className="text-blue-600">
                      <Play className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation currentPath="/home" />
    </div>
  )
}
