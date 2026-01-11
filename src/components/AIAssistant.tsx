import { useState, useRef } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { llmService } from '../services/llmService';

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickPrompts(false);

    try {
      // Prepare messages for the LLM service
      // We map our local Message type to the service's Message type
      const history = messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }));
      // Add the current new message
      history.push({ role: 'user', content: text });

      const responseText = await llmService.generateResponse(history);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden bg-gradient-to-br from-red-50 to-rose-100">
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
      <div className="fixed bottom-0 left-0 right-0 md:left-64 md:right-0 w-full md:w-auto bg-white/80 backdrop-blur-xl border-t border-red-200/50 p-4 pb-24 md:pb-4 shadow-lg md:flex md:justify-center md:border-t-0 md:border-l md:fixed md:top-0 md:bottom-0 md:h-screen">
        <div className="max-w-3xl mx-auto md:w-[calc(100%-256px)]">
          <div className="flex flex-wrap gap-2 mb-4">
          {showQuickPrompts && QUICK_PROMPTS.map((prompt) => (
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
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}