import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-blue-600">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Log in</Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
