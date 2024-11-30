import { Volume2 } from 'lucide-react';
import { speakText } from '../lib/speech';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
}

export function ChatMessage({ isAi, message }: ChatMessageProps) {
  const handleSpeak = () => {
    speakText(message);
  };

  return (
    <div className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex ${isAi ? 'flex-row' : 'flex-row-reverse'} max-w-[80%] items-start gap-2`}>
        <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex-none">
          {isAi ? (
            <img 
              src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg" 
              alt="AI Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src="https://static.vecteezy.com/system/resources/previews/035/864/134/non_2x/3d-simple-user-icon-isolated-render-profile-photo-symbol-ui-avatar-sign-person-or-people-gui-element-realistic-illustration-vector.jpg" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isAi
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
              : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
          }`}
        >
          <span>{message}</span>
          {isAi && (
            <button
              onClick={handleSpeak}
              className="inline-flex items-center ml-2 text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              title="Mesajı seslendir"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}