import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowRight } from "lucide-react"
import ImagePlaceholder from "../components/image-placeholder"

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-blue-600">MoveWell</h1>
            <p className="text-xl font-medium text-gray-700">Your personal posture coach</p>
          </div>

          <div className="py-6">
            <div className="w-64 h-64 mx-auto relative">
              <ImagePlaceholder width={256} height={256} text="Person with good posture" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Improve your posture, reduce back pain, and move better with AI-powered guidance
            </p>

            <div className="pt-4">
              <Link to="/onboarding">
                <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="pt-2 flex justify-center space-x-4">
              <Link to="/login" className="text-blue-600 font-medium">
                Log in
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="text-blue-600 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
