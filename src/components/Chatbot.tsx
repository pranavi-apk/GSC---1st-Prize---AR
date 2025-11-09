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
      text: "Apa yang harus saya lakukan saat gempa bumi?",
      isUser: true,
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
    {
      id: 5,
      text: "Saat gempa bumi, lindungi kepala dan leher Anda, berlindung di bawah meja yang kuat, dan jauhi jendela. Setelah guncangan berhenti, evakuasi ke tempat terbuka.",
      isUser: false,
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
    {
      id: 6,
      text: "Bagaimana cara membuat kit darurat?",
      isUser: true,
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
    },
    {
      id: 7,
      text: "Kit darurat harus mencakup air (1 galon per orang per hari), makanan non-perishable, senter, baterai, obat-obatan, salinan dokumen penting, dan radio darurat.",
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