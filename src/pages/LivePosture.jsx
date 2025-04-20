import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Play, Pause, AlertTriangle, ThumbsUp, Camera } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"

// Import postureDemo image
import postureDemo from "../assets/onboarding/posture-analysis.jpg"

export default function LivePosturePage() {
  const { postureScore, updatePostureScore } = useExercise()
  const [isActive, setIsActive] = useState(false)
  const [currentPosture, setCurrentPosture] = useState("Good")
  const [timeInGoodPosture, setTimeInGoodPosture] = useState(0)
  const [warningCount, setWarningCount] = useState(0)
  const [webcamAccess, setWebcamAccess] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Request webcam access
  const requestWebcamAccess = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setWebcamAccess(true)
        // In a real app, you would initialize your posture detection here
        // For now, we'll simulate with a timeout
        setTimeout(() => {
          setIsActive(true)
        }, 1500)
      })
      .catch(err => {
        console.error("Error accessing webcam:", err)
        alert("Please allow webcam access to use the posture tracking feature")
      })
  }

  // Simulate posture changes
  useEffect(() => {
    if (!isActive) return
    
    let timer = null
    let activityTimer = null

    // Simulate posture analysis with random changes
    timer = setInterval(() => {
      const rand = Math.random()
      if (rand < 0.2) {
        setCurrentPosture("Poor")
        setWarningCount(prev => prev + 1)
      } else if (rand < 0.4) {
        setCurrentPosture("Fair")
      } else {
        setCurrentPosture("Good")
        setTimeInGoodPosture(prev => prev + 5)
      }
    }, 5000)
    
    // Track elapsed time
    activityTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(activityTimer)
    }
  }, [isActive])

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Get posture class for styling
  const getPostureClass = () => {
    switch(currentPosture) {
      case "Good": return "text-green-600 bg-green-100"
      case "Fair": return "text-yellow-600 bg-yellow-100"
      case "Poor": return "text-red-600 bg-red-100"
      default: return "text-blue-600 bg-blue-100"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Live Posture Tracking</h1>
        {isActive && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 border-red-200"
            onClick={() => setIsActive(false)}
          >
            <Pause className="h-4 w-4 mr-1" /> Stop
          </Button>
        )}
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20">
        <Card className="p-4 space-y-4">
          {!webcamAccess ? (
            <div className="text-center p-6 space-y-4">
              <Camera className="h-12 w-12 mx-auto text-blue-600" />
              <h2 className="text-lg font-medium">Enable Camera Access</h2>
              <p className="text-gray-500">
                We need camera access to analyze your posture in real-time.
                Your privacy is important - no video is recorded or stored.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={requestWebcamAccess}
              >
                Allow Camera Access
              </Button>
            </div>
          ) : !isActive ? (
            <div className="text-center p-6 space-y-4">
              <div className="w-48 h-48 rounded-lg mx-auto overflow-hidden">
                <img 
                  src={postureDemo} 
                  alt="Posture detection demo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="text-lg font-medium">Start Posture Tracking</h2>
              <p className="text-gray-500">
                Our AI will monitor your posture in real-time and provide feedback
                to help you maintain a healthy sitting position.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsActive(true)}
              >
                <Play className="h-4 w-4 mr-1" /> Start Tracking
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-black rounded-lg h-64 relative flex items-center justify-center">
                <div className="text-white">Camera Preview</div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getPostureClass()}`}>
                  {currentPosture} Posture
                </div>
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {formatTime(elapsedTime)}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Current Posture Score</h3>
                  <span className="font-bold text-blue-600">{postureScore}/100</span>
                </div>
                <Progress value={postureScore} className="h-2 bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg flex items-center">
                  <ThumbsUp className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Good Posture Time</div>
                    <div className="font-medium">{formatTime(timeInGoodPosture)}</div>
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Posture Warnings</div>
                    <div className="font-medium">{warningCount}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Card className="p-3 bg-blue-50 border border-blue-200">
                  <h3 className="font-medium text-blue-800">Posture Tips</h3>
                  <ul className="text-sm text-blue-700 pl-5 pt-1 list-disc">
                    <li>Keep your back straight against the chair</li>
                    <li>Position your screen at eye level</li>
                    <li>Keep your shoulders relaxed</li>
                    <li>Take a short break every 30 minutes</li>
                  </ul>
                </Card>
              </div>
            </>
          )}
        </Card>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">How It Works</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Our AI-powered posture tracking uses computer vision to analyze your sitting position
                in real-time. The system looks at key points on your body to determine if you're
                maintaining proper ergonomic posture.
              </p>
              <p className="text-sm text-gray-600">
                When your posture needs correction, you'll receive gentle reminders. Over time,
                this helps build awareness and develop better habits.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <BottomNavigation currentPath="/posture" />
    </div>
  )
}