import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, Settings, Shield, User } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useUser } from "../context/user-context"
import ImagePlaceholder from "../components/image-placeholder"
import EditProfile from "../components/edit-profile"
import { useState } from "react"

// Import user avatar
import userAvatar from "../assets/profiles/user-avatar.jpg"

export default function ProfilePage() {
  const { user, logout, updateUser } = useUser()
  const navigate = useNavigate()
  const [showEditProfile, setShowEditProfile] = useState(false)
  
  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleSaveProfile = (updatedUser) => {
    const success = updateUser(updatedUser)
    if (success) {
      setShowEditProfile(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20">
        <Card className="p-4">
          {showEditProfile ? (
            <EditProfile 
              user={user}
              onSave={handleSaveProfile}
              onCancel={() => setShowEditProfile(false)}
            />
          ) : (
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <ImagePlaceholder 
                  width={64} 
                  height={64} 
                  text="Profile" 
                  imageSrc={userAvatar}
                />
              </div>
              <div>
                <h2 className="font-bold text-lg">{user?.name || "User"}</h2>
                <p className="text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
              <div className="ml-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowEditProfile(true)}
                >
                  <User className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </div>
          )}
        </Card>

        <section className="space-y-2">
          <h2 className="text-lg font-medium px-1">Account</h2>
          <Card>
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Subscription</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Privacy</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium px-1">Notifications</h2>
          <Card>
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <div>Posture Alerts</div>
                    <div className="text-sm text-gray-500">Get notified about poor posture</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <div>Exercise Reminders</div>
                    <div className="text-sm text-gray-500">Daily reminders to exercise</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium px-1">Support</h2>
          <Card>
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="p-4 flex items-center justify-between">
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left"
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-red-600">Log Out</span>
                </button>
              </div>
            </div>
          </Card>
        </section>

        <div className="text-center text-sm text-gray-500 pt-4">
          <p>MoveWell v1.0.0</p>
          <p>© 2025 MoveWell Health Technologies</p>
        </div>
      </main>

      <BottomNavigation currentPath="/profile" />
    </div>
  )
}
