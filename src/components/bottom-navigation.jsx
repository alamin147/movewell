import { Link } from "react-router-dom"
import { Home, Play, User, Video, MessageSquare, Activity } from "lucide-react"

export default function BottomNavigation({ currentPath }) {
  const navItems = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      label: "Exercises",
      href: "/exercises",
      icon: Play,
    },
    {
      label: "Posture",
      href: "/posture",
      icon: Activity,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      label: "Doctors",
      href: "/doctors",
      icon: Video,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around py-2 z-10">
      {navItems.map((item) => {
        const isActive = currentPath === item.href
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-md ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}