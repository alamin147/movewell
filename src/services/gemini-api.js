import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key - Add error handling
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Gemini API key is missing! Check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Default prompt to help Gemini understand the context and topic constraints
const SYSTEM_PROMPT = `You are MoveWell's AI assistant, a helpful digital coach specializing in posture, ergonomics, 
and physical wellness. Provide advice about exercises, posture improvement, ergonomics, and general physical wellness. 
Keep responses friendly, helpful, and focused on evidence-based information. If asked about topics outside your scope 
(like medical diagnoses, treatment plans, or non-wellness topics), politely redirect the conversation to posture 
and exercise topics you can assist with.`;

// Create and store the chat session
let chatHistory = [];

export async function sendMessageToGemini(userMessage) {
  try {
    // Get the model - Use gemini-pro instead of gemini-1.5-flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" // Changed from gemini-1.5-flash to stable gemini-pro model
    });
    
    // Simplified approach - create a new chat each time
    // For gemini-pro, use this simplified approach without systemInstruction
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
      // systemInstruction has been removed as it's causing the error
    });
    
    console.log("Sending message to Gemini:", userMessage);
    
    // Include system prompt as the first message
    if (chatHistory.length === 0) {
      // If this is the first message, prepend with our system prompt
      let firstMessage = `${SYSTEM_PROMPT}\n\nUser question: ${userMessage}`;
      const result = await chat.sendMessage(firstMessage);
      const response = await result.response;
      const text = response.text();
      
      console.log("Received response from Gemini:", text);
      
      // Add messages to history
      chatHistory.push({ 
        role: "user", 
        parts: [{ text: userMessage }] 
      });
      
      chatHistory.push({ 
        role: "assistant", 
        parts: [{ text: text }] 
      });
      
      return text;
    } else {
      // Regular message flow for subsequent messages
      // Include history manually in the message for context
      let contextMessage = userMessage;
      if (chatHistory.length > 0) {
        // Add minimal context from previous exchanges
        const context = chatHistory
          .slice(-4) // Use just the last 2 exchanges
          .map(msg => `${msg.role}: ${msg.parts[0].text}`)
          .join("\n");
        contextMessage = `Previous conversation:\n${context}\n\nCurrent question: ${userMessage}`;
      }
      
      // Send message and get response
      const result = await chat.sendMessage(contextMessage);
      const response = await result.response;
      const text = response.text();
      
      console.log("Received response from Gemini:", text);
      
      // Add messages to history
      chatHistory.push({ 
        role: "user", 
        parts: [{ text: userMessage }] 
      });
      
      chatHistory.push({ 
        role: "assistant", 
        parts: [{ text: text }] 
      });
      
      // Limit history length to prevent token limits
      if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice(-10);
      }
      
      return text;
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // More detailed error handling
    if (error.message && error.message.includes("API key")) {
      return "API key error. Please check your Gemini API configuration.";
    } else if (error.message && error.message.includes("quota")) {
      return "API quota exceeded. Please try again later.";
    } else if (error.message && error.message.includes("model")) {
      return "The requested AI model is currently unavailable. Please try again later.";
    }
    
    return "I'm having trouble connecting right now. Please check your console for more details and try again.";
  }
}

// Clear chat history
export function clearChatHistory() {
  chatHistory = [];
}