import { useState, useEffect, useRef } from 'react';
import './index.css';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { FunFact } from './components/FunFact';
import { ThemeToggle } from './components/ThemeToggle';
import { getChatResponse } from './lib/gemini';

interface Message {
  content: string;
  isAi: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send welcome message when component mounts
    const welcomeMessage = async () => {
      setIsLoading(true);
      try {
        const response = await getChatResponse("Bana çocuk dostu bir karşılama mesajı yaz");
        setMessages([{ content: response, isAi: true }]);
      } catch (error) {
        setMessages([{ 
          content: "Merhaba! Ben Kankai, seninle sohbet etmek için sabırsızlanıyorum!", 
          isAi: true 
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    welcomeMessage();
  }, []);

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { content: message, isAi: false }]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(message);
      setMessages(prev => [...prev, { content: response, isAi: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        content: "Üzgünüm, bir hata oluştu. Tekrar dener misin?", 
        isAi: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header with animated gradient */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient"
          style={{ 
            backgroundSize: '200% 200%',
            transition: 'background-position 75s ease-in-out' // 5 kat daha yavaş (15s * 5 = 75s)
          }}
        />
        <div className="relative z-10 p-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform hover:scale-110">
                <img 
                  src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg" 
                  alt="Kankai Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">Kankai; Senin yapay zeka kankan!</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 space-y-4">
        {/* Chat Box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-4 transition-colors">
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto scroll-smooth"
          >
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                isAi={message.isAi} 
                message={message.content} 
              />
            ))}
            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-purple-500 dark:text-purple-400">
                <div className="animate-bounce">●</div>
                <div className="animate-bounce animation-delay-200">●</div>
                <div className="animate-bounce animation-delay-400">●</div>
              </div>
            )}
          </div>
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>

        {/* Fun Fact Box */}
        <FunFact />
      </div>
    </div>
  );
}

export default App;