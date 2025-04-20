import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft, Clock, Flame, Play, Pause } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useExercise } from "../context/exercise-context"
import ImagePlaceholder from "../components/image-placeholder"

// Import exercise data
import exerciseDataFile from "../data/exercises.json"

// Remove direct imports of images that don't exist
// Instead, we'll use a dynamic approach that doesn't require importing files that might not exist

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isExercising, setIsExercising] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(null)
  const { completeExercise } = useExercise()
  const [exerciseData, setExerciseData] = useState([])

  useEffect(() => {
    // Load exercise data without relying on image imports
    const loadedData = exerciseDataFile.exercises.map(exercise => ({
      ...exercise,
      // Keep the imagePath for reference - we'll use this directly in ImagePlaceholder
    }));
    setExerciseData(loadedData);
  }, []);

  // Filter exercises based on the active tab
  const filteredExercises = exerciseData.filter(exercise => {
    if (activeTab === "all") return true;
    return exercise.category === activeTab;
  });

  const toggleExercise = (exercise) => {
    if (!isExercising) {
      setCurrentExercise(exercise)
    }
    setIsExercising(!isExercising)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (!currentExercise) return;
    
    if (currentStep < currentExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the exercise - make sure category is included
      completeExercise({
        ...currentExercise,
        completedAt: new Date().toISOString()
      });
      
      // Reset the exercise state
      setIsExercising(false);
      setCurrentStep(0);
      setCurrentExercise(null);
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

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-white px-4 py-2 border-b">
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="neck">Neck</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4 space-y-6 pb-20">
          {isExercising && currentExercise ? (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">{currentExercise.name}</h2>
                <p className="text-gray-500">
                  Step {currentStep + 1} of {currentExercise.steps.length}
                </p>
              </div>

              <div className="py-6 flex justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <ImagePlaceholder 
                    width={192} 
                    height={192} 
                    text={currentExercise.name}
                    // Just pass the exercise name as the text for now
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-center text-blue-800 font-medium">{currentExercise.steps[currentStep]}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1 py-6" onClick={() => setIsExercising(false)}>
                  <Pause className="mr-2 h-5 w-5" /> Pause
                </Button>
                <Button className="flex-1 py-6 bg-blue-600 hover:bg-blue-700" onClick={nextStep}>
                  {currentStep < currentExercise.steps.length - 1 ? (
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
            <div className="mt-0">
              <div className="space-y-4">
                {filteredExercises.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No exercises found in this category.
                  </div>
                ) : (
                  filteredExercises.map((exercise) => (
                    <Card key={exercise.id} className="overflow-hidden">
                      <div className="h-40 bg-gray-100">
                        <ImagePlaceholder 
                          width={400} 
                          height={160} 
                          text={exercise.name} 
                          // Just use the exercise name as text instead of trying to load images
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-lg">{exercise.name}</h3>
                          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                            {exercise.category}
                          </span>
                        </div>

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
                          onClick={() => toggleExercise(exercise)}
                        >
                          <Play className="mr-2 h-5 w-5" /> Start Exercise
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </Tabs>

      <BottomNavigation currentPath="/exercises" />
    </div>
  )
}
