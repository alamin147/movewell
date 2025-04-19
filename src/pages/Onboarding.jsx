import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"

// Import onboarding images
import postureAnalysisImg from "../assets/onboarding/posture-analysis.jpg"
import guidedExerciseImg from "../assets/onboarding/guided-exercise.jpg"
import progressTrackingImg from "../assets/onboarding/progress-tracking.jpg"

const onboardingSteps = [
  {
    title: "AI Posture Analysis",
    description: "Our AI technology analyzes your posture in real-time and provides personalized feedback.",
    icon: "📊",
    image: postureAnalysisImg
  },
  {
    title: "Guided Exercises",
    description: "Follow our expert-designed exercises to strengthen your back and improve posture.",
    icon: "💪",
    image: guidedExerciseImg
  },
  {
    title: "Track Your Progress",
    description: "Earn rewards and compete with friends as you build healthy habits.",
    icon: "🏆",
    image: progressTrackingImg
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const goToNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4 flex items-center">
        {currentStep > 0 ? (
          <Button variant="ghost" size="icon" onClick={goToPrevStep}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-9"></div>
        )}
        <div className="flex-1"></div>
        <Link to="/home" className="text-sm text-blue-600 font-medium">
          Skip
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md flex flex-col items-center text-center space-y-8">
          <div className="w-64 h-64 rounded-lg overflow-hidden">
            <img 
              src={onboardingSteps[currentStep].image} 
              alt={onboardingSteps[currentStep].title}
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">{onboardingSteps[currentStep].title}</h1>
            <p className="text-gray-600">{onboardingSteps[currentStep].description}</p>
          </div>

          <div className="flex space-x-2 pt-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentStep ? "w-8 bg-blue-600" : "w-2 bg-gray-200",
                )}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-md pt-8">
          {currentStep < onboardingSteps.length - 1 ? (
            <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700" onClick={goToNextStep}>
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Link to="/home" className="w-full">
              <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
