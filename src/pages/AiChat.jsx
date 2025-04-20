import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { SendHorizontal, Bot, User, ChevronDown, Loader2 } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"

// Mock conversation starters
const CONVERSATION_STARTERS = [
  "How can I improve my posture?",
  "What exercises help with lower back pain?",
  "How often should I take breaks when sitting?",
  "What are signs of poor ergonomics?"
];

// Mock responses
const BOT_RESPONSES = {
  "How can I improve my posture?": 
    "To improve your posture, try these tips:\n\n• Keep your shoulders back and relaxed\n• Pull in your abdomen\n• Keep your feet flat on the floor\n• Take regular breaks from sitting\n• Consider ergonomic furniture\n• Practice posture-strengthening exercises like planks and wall stands",
  
  "What exercises help with lower back pain?": 
    "For lower back pain, these exercises can help:\n\n• Gentle stretches like child's pose and cat-cow\n• Pelvic tilts to strengthen your core\n• Knee-to-chest stretches\n• Walking and swimming for low-impact movement\n• Strengthening exercises for your back muscles\n\nAlways start gently and consult with a healthcare provider if you have severe pain.",
  
  "How often should I take breaks when sitting?": 
    "It's recommended to take a short break every 30 minutes when sitting for long periods. Even a 1-2 minute break to stand up, stretch, or walk around can make a significant difference.\n\nConsider using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain as well.",
  
  "What are signs of poor ergonomics?": 
    "Signs of poor ergonomics include:\n\n• Frequent discomfort or pain in your neck, shoulders, or back\n• Tingling or numbness in hands or wrists\n• Headaches, especially in the afternoon\n• Eye strain or blurred vision\n• Feeling stiff after sitting\n• Reduced productivity due to discomfort\n\nIf you experience these regularly, consider evaluating your workspace setup.",
};

// Default response for unknown queries
const DEFAULT_RESPONSE = "I'm here to help with posture and ergonomics questions. Could you rephrase your question, or try one of the suggested topics below?";

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi there! I'm your MoveWell AI assistant. How can I help you with your posture and ergonomics today?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send message handler
  const handleSendMessage = (content = input) => {
    if (!content.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      let botResponse = ""
      
      // Check for match in predefined responses
      Object.keys(BOT_RESPONSES).forEach(key => {
        if (content.toLowerCase().includes(key.toLowerCase())) {
          botResponse = BOT_RESPONSES[key]
        }
      })
      
      // Use default if no match
      if (!botResponse) {
        botResponse = DEFAULT_RESPONSE
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: botResponse
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">MoveWell Assistant</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`px-4 py-3 rounded-lg max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white border border-gray-200 rounded-tl-none"
                }`}
              >
                <div className="flex items-start mb-1">
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                  ) : (
                    <User className="h-5 w-5 mr-2 text-white mt-0.5" />
                  )}
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <Card className="mb-4 p-4">
            <h3 className="text-sm font-medium mb-2">Try asking about:</h3>
            <div className="grid grid-cols-1 gap-2">
              {CONVERSATION_STARTERS.map((starter, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="justify-start h-auto py-2 text-left"
                  onClick={() => handleSendMessage(starter)}
                >
                  {starter}
                </Button>
              ))}
            </div>
          </Card>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-2 flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-0 focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="ml-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </main>

      <BottomNavigation currentPath="/chat" />
    </div>
  )
}