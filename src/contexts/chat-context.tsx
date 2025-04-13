
import { createContext, useState, useContext, ReactNode } from "react";
import { Message } from "@/types";
import { useAuth } from "./auth-context";
import { useEvents } from "./event-context";
import { chatService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Gemini API key and URL
const GEMINI_API_KEY = "AIzaSyCbkxiJowyTvUZUXq6dLtGAMxF2jZTKhhk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI event planning assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated, getToken } = useAuth();
  const { createEvent } = useEvents();
  const { toast } = useToast();

  // Function to call Gemini API
  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an event planning assistant that helps users plan and organize events. 
              Keep your responses focused on event planning and scheduling.
              Current conversation: ${JSON.stringify(messages.map(m => ({ role: m.sender, content: m.content })))}
              User query: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        })
      });

      if (!response.ok) {
        console.error('Gemini API error:', await response.text());
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      // Extract the text from the response
      if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected Gemini API response structure:', data);
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true);
    setError(null);
    
    // If not authenticated, handle message locally
    if (!isAuthenticated) {
      setLoading(false);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: "Please log in to use the AI assistant features.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    
    // Get token and validate
    const token = getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: "Authentication error. Please try logging in again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    
    try {
      // Call Gemini API instead of the demo response
      const aiResponse = await callGeminiAPI(content);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error('AI response error:', err);
      setError("Failed to get response from assistant");
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: "I'm having trouble connecting to the AI service right now. Please try again later.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      
      toast({
        title: "Error",
        description: "Failed to communicate with the AI assistant.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your AI event planning assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        loading,
        error,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
