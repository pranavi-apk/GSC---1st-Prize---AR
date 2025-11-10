import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("chatbot_welcome"),
      isUser: false,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 2,
      text: t("chatbot_demo_question"),
      isUser: true,
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
    },
    {
      id: 3,
      text: t("chatbot_demo_response"),
      isUser: false,
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: 4,
      text: "What should I do during an earthquake?",
      isUser: true,
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
    {
      id: 5,
      text: "During an earthquake, protect your head and neck, shelter under a sturdy table, and stay away from windows. After shaking stops, evacuate to an open area.",
      isUser: false,
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
    {
      id: 6,
      text: "How do I make an emergency kit?",
      isUser: true,
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
    },
    {
      id: 7,
      text: "An emergency kit should include water (1 gallon per person per day), non-perishable food, a flashlight, batteries, medications, copies of important documents, and an emergency radio.",
      isUser: false,
      timestamp: new Date(), // now
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: t("chatbot_demo_response"),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.isUser
                  ? "bg-red-600 text-white rounded-tr-none"
                  : "bg-white text-slate-900 rounded-tl-none shadow-sm"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isUser ? "text-red-100" : "text-slate-500"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("type_your_message")}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={inputText.trim() === ""}
            className="bg-red-600 hover:bg-red-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}