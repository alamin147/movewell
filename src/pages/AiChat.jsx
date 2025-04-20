import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { SendHorizontal, Bot, User, Loader2 } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import { sendMessageToGemini, clearChatHistory } from "../services/gemini-api"

// Conversation starters focused on posture and ergonomics
const CONVERSATION_STARTERS = [
  "How can I improve my posture?",
  "What exercises help with lower back pain?",
  "How often should I take breaks when sitting?",
  "What are signs of poor ergonomics?"
];

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi there! I'm your MoveWell AI assistant powered by Gemini. How can I help you with your posture and ergonomics today?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Reset chat history when component unmounts
  useEffect(() => {
    return () => {
      clearChatHistory();
    };
  }, []);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send message handler
  const handleSendMessage = async (content = input) => {
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

    try {
      // Call Gemini API
      const response = await sendMessageToGemini(content);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: response
      }]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: "I'm having trouble processing your request. Please try again later."
      }]);
    } finally {
      setIsTyping(false);
    }
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
            disabled={!input.trim() || isTyping}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </main>

      <BottomNavigation currentPath="/chat" />
    </div>
  )
}