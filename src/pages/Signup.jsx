import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <div className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="text-gray-500">Enter your information to get started</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Create account</Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
