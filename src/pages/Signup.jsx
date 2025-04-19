import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { useUser } from "../context/user-context"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [error, setError] = useState("")
  
  const { signup } = useUser()
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    setError("")
    
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    if (!agreedTerms) {
      setError("You must agree to the terms and conditions")
      return
    }
    
    // This would normally send data to an API
    const success = signup({ firstName, lastName, email, password })
    
    if (success) {
      navigate("/onboarding")
    } else {
      setError("Something went wrong. Please try again.")
    }
  }

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

          <form onSubmit={handleSignup} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input 
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreedTerms}
                onChange={() => setAgreedTerms(!agreedTerms)}
              />
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

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Create account</Button>
          </form>

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
