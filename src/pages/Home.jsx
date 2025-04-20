import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Bell, Calendar, Info, MapPin, Play, User, X } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"
import { useState } from "react"
import NearbyHealthLocations from "../components/nearby-health-locations"

// Import exercise images
import neckStretchImg from "../assets/exercises/neck-stretch.jpg"
import backStretchImg from "../assets/exercises/back-stretch.jpg"
import shoulderMobilityImg from "../assets/exercises/shoulder-mobility.jpg"

export default function HomePage() {
  const { postureScore, currentStreak } = useExercise()
  const [showNotifications, setShowNotifications] = useState(false)

  const recommendedExercises = [
    { name: "Neck Stretches", image: neckStretchImg, duration: "5 min", level: "Beginner" },
    { name: "Lower Back Relief", image: backStretchImg, duration: "7 min", level: "Beginner" },
    { name: "Shoulder Mobility", image: shoulderMobilityImg, duration: "5 min", level: "Beginner" },
  ];

  // Sample notifications
  const notifications = [
    { id: 1, text: "You've completed your daily posture check", time: "Just now" },
    { id: 2, text: "Remember to take a break and stretch", time: "1 hour ago" },
    { id: 3, text: "New exercise routine available", time: "Yesterday" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b relative">
        <h1 className="text-xl font-bold text-blue-600">MoveWell</h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 text-center border-t">
                  <Button variant="link" size="sm" className="text-blue-600 text-xs">
                    Clear all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
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
            {recommendedExercises.map((exercise, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-lg h-14 w-14 flex items-center justify-center overflow-hidden">
                    <ImagePlaceholder 
                      width={56} 
                      height={56} 
                      text={exercise.name}
                      imageSrc={exercise.image} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <p className="text-sm text-gray-500">{exercise.duration} • {exercise.level}</p>
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

        {/* New section for Nearby Health Locations */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Nearby Health Locations</h2>
            <Button variant="ghost" size="sm" className="h-8 text-blue-600">
              <MapPin className="h-4 w-4 mr-1" /> View All
            </Button>
          </div>
          <NearbyHealthLocations />
        </section>
      </main>

      <BottomNavigation currentPath="/home" />
    </div>
  )
}
