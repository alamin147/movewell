import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, Settings, Shield, User, Phone, X, PhoneCall } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { useUser } from "../context/user-context"
import ImagePlaceholder from "../components/image-placeholder"
import EditProfile from "../components/edit-profile"
import { useState, useEffect } from "react"

// Import user avatar
import userAvatar from "../assets/profiles/user-avatar.jpg"

// Import emergency contacts data
import emergencyContactsData from "../data/emergency-contacts.json"

export default function ProfilePage() {
  const { user, logout, updateUser } = useUser()
  const navigate = useNavigate()
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showEmergencyContactModal, setShowEmergencyContactModal] = useState(false)
  
  // Load emergency contacts from JSON file
  const [emergencyContacts, setEmergencyContacts] = useState([])
  
  // Load contacts from JSON when component mounts
  useEffect(() => {
    setEmergencyContacts(emergencyContactsData.contacts)
  }, [])
  
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

  const handleCall = (phoneNumber) => {
    // In a real app, this would initiate a call
    // For a web app, we can use tel: protocol
    window.location.href = `tel:${phoneNumber}`
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

        {/* Emergency Contacts Section */}
        <section className="space-y-2">
          <h2 className="text-lg font-medium px-1">Emergency Contacts</h2>
          <Card>
            <div className="divide-y">
              {emergencyContacts.slice(0, 2).map(contact => (
                <div key={contact.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <div>{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.relationship}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-blue-600 mr-2">{contact.phone}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                      onClick={() => handleCall(contact.phone.replace(/\D/g, ''))}
                    >
                      <PhoneCall className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="p-4 flex items-center justify-between">
                <span>View All Emergency Contacts</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8"
                  onClick={() => setShowEmergencyContactModal(true)}
                >
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Button>
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

      {/* Emergency Contact Modal */}
      {showEmergencyContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Emergency Contacts</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setShowEmergencyContactModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-gray-500">{contact.relationship}</p>
                    <p className="text-sm text-blue-600">{contact.phone}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                    onClick={() => handleCall(contact.phone.replace(/\D/g, ''))}
                  >
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {/* <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> Add New Contact
              </Button> */}
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPath="/profile" />
    </div>
  )
}
