import { useState, useRef } from 'react';
import { Send, Bot } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const QUICK_PROMPTS = [
  'What should I do during a flood?',
  'Nearest evacuation route',
  'First aid for injuries',
  'How to purify water?',
];

const AI_RESPONSES: Record<string, string> = {
  'What should I do during a flood?':
    'During a flood: 1) Move to higher ground immediately 2) Avoid walking through moving water 3) Stay away from power lines 4) Listen to emergency broadcasts 5) Do not return home until authorities say it is safe. If trapped, move to the highest level and signal for help.',
  'Nearest evacuation route':
    'Based on your location in North Jakarta, the nearest evacuation center is Jakarta Community Center, 2.3 km northwest. Route: Take Jl. Gatot Subroto north, turn left on Jl. Thamrin. Follow emergency signage. Estimated time: 15 minutes on foot.',
  'First aid for injuries':
    'For common injuries: 1) Stop bleeding by applying direct pressure 2) Clean wounds with clean water 3) Cover with sterile bandage 4) For severe bleeding, broken bones, or chest pain, seek immediate medical help. Contact emergency services or request medical drone assistance through the app.',
  'How to purify water?':
    'Emergency water purification: 1) Filter through cloth to remove debris 2) Boil for at least 1 minute 3) Let it cool before drinking. If unable to boil: Add 2 drops of household bleach per liter, wait 30 minutes. Request water supplies through the Aid Request feature if needed.',
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Hello, I\'m your Resilient360 AI Assistant. I\'m here to help you stay safe during emergencies. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response =
        AI_RESPONSES[text] ||
        'I understand your concern. For immediate emergency assistance, please use the Contact Emergency button on the Dashboard. Our team is available 24/7 to help you. You can also submit an Image Request for aid delivery.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-gray-900">AI Assistant</h1>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-4 py-3 shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
                  : 'bg-white/90 backdrop-blur-xl text-gray-900 border border-red-200/50'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-red-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {/* Spacer for fixed bottom section */}
        <div className="h-48"></div>
      </div>

      {/* Quick Prompts and Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-red-200/50 p-4 pb-24 shadow-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="bg-red-50/80 backdrop-blur-xl text-red-700 px-4 py-2 rounded-full text-sm hover:bg-red-100 transition-all border border-red-200/50 shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about safety..."
            className="flex-1 bg-white/90 backdrop-blur-xl border border-red-200/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-red-600 to-red-700 text-white p-3 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}