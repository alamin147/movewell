import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft, Clock, Flame, Play, Pause } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"

// Import exercise images
import neckStretchImg from "../assets/exercises/neck-stretch.jpg"
import backStretchImg from "../assets/exercises/back-stretch.jpg"
import shoulderMobilityImg from "../assets/exercises/shoulder-mobility.jpg"
import postureCorrectionImg from "../assets/exercises/posture-correction.jpg"
import deskStretchImg from "../assets/exercises/desk-stretch.jpg"

const exerciseSteps = [
  "Stand with your feet shoulder-width apart",
  "Slowly roll your shoulders back and down",
  "Gently tuck your chin in",
  "Hold this position for 10 seconds",
  "Relax and repeat 5 times",
]

const exerciseData = [
  {
    name: "Posture Correction",
    image: postureCorrectionImg,
    duration: "5 min",
    level: "Beginner"
  },
  {
    name: "Neck Relief",
    image: neckStretchImg,
    duration: "3 min",
    level: "Beginner"
  },
  {
    name: "Lower Back Stretch",
    image: backStretchImg,
    duration: "7 min",
    level: "Intermediate"
  },
  {
    name: "Shoulder Mobility",
    image: shoulderMobilityImg,
    duration: "5 min",
    level: "Beginner"
  },
  {
    name: "Desk Stretches",
    image: deskStretchImg,
    duration: "4 min",
    level: "Beginner"
  }
]

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isExercising, setIsExercising] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(null)
  const { completeExercise } = useExercise()

  const toggleExercise = (exerciseName) => {
    if (!isExercising) {
      setCurrentExercise(exerciseName)
    }
    setIsExercising(!isExercising)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < exerciseSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete the exercise
      if (currentExercise) {
        completeExercise(currentExercise)
      }
      setIsExercising(false)
      setCurrentStep(0)
    }
  }

  // Find the current exercise data
  const getCurrentExerciseImage = () => {
    const exerciseItem = exerciseData.find(ex => ex.name === currentExercise);
    return exerciseItem ? exerciseItem.image : null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Link to="/home">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Exercises</h1>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="bg-white px-4 py-2 border-b">
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="neck">Neck</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4 space-y-6 pb-20">
          {isExercising ? (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">{currentExercise}</h2>
                <p className="text-gray-500">
                  Step {currentStep + 1} of {exerciseSteps.length}
                </p>
              </div>

              <div className="py-6 flex justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <ImagePlaceholder 
                    width={192} 
                    height={192} 
                    text="Exercise demo" 
                    imageSrc={getCurrentExerciseImage()}
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-center text-blue-800 font-medium">{exerciseSteps[currentStep]}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1 py-6" onClick={() => toggleExercise()}>
                  <Pause className="mr-2 h-5 w-5" /> Pause
                </Button>
                <Button className="flex-1 py-6 bg-blue-600 hover:bg-blue-700" onClick={nextStep}>
                  {currentStep < exerciseSteps.length - 1 ? (
                    <>
                      Next Step <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </>
                  ) : (
                    <>Finish</>
                  )}
                </Button>
              </div>
            </Card>
          ) : (
            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {exerciseData.map((exercise, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-40 bg-gray-100">
                      <ImagePlaceholder 
                        width={400} 
                        height={160} 
                        text={exercise.name} 
                        imageSrc={exercise.image}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-lg">{exercise.name}</h3>

                      <div className="flex space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{exercise.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          <span>{exercise.level}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        onClick={() => toggleExercise(exercise.name)}
                      >
                        <Play className="mr-2 h-5 w-5" /> Start Exercise
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </main>
      </Tabs>

      <BottomNavigation currentPath="/exercises" />
    </div>
  )
}
