
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft, Clock, Flame, Play, Pause } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"

const exerciseSteps = [
  "Stand with your feet shoulder-width apart",
  "Slowly roll your shoulders back and down",
  "Gently tuck your chin in",
  "Hold this position for 10 seconds",
  "Relax and repeat 5 times",
]

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isExercising, setIsExercising] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const toggleExercise = () => {
    setIsExercising(!isExercising)
  }

  const nextStep = () => {
    if (currentStep < exerciseSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsExercising(false)
      setCurrentStep(0)
    }
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
                <h2 className="text-xl font-bold">Posture Correction</h2>
                <p className="text-gray-500">
                  Step {currentStep + 1} of {exerciseSteps.length}
                </p>
              </div>

              <div className="py-6 flex justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=192&width=192"
                    alt="Exercise demonstration"
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-center text-blue-800 font-medium">{exerciseSteps[currentStep]}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1 py-6" onClick={toggleExercise}>
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
                {["Posture Correction", "Neck Relief", "Lower Back Stretch", "Shoulder Mobility", "Desk Stretches"].map(
                  (exercise, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-40 bg-gray-100">
                        <img
                          src={`/placeholder.svg?height=160&width=400`}
                          alt={exercise}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-bold text-lg">{exercise}</h3>

                        <div className="flex space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>5 min</span>
                          </div>
                          <div className="flex items-center">
                            <Flame className="h-4 w-4 mr-1" />
                            <span>Beginner</span>
                          </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={toggleExercise}>
                          <Play className="mr-2 h-5 w-5" /> Start Exercise
                        </Button>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>
          )}
        </main>
      </Tabs>

      <BottomNavigation currentPath="/exercises" />
    </div>
  )
}
