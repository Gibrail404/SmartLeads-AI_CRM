
import { Avatar } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
  };
  formatTime: (timestamp: string) => string;
}

const ChatMessage = ({ message, formatTime }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-shrink-0 mt-1">
          <Avatar className={`h-7 w-7 ${
            message.sender === 'user' 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-primary/20 text-primary'
          }`}>
            {message.sender === 'user' 
              ? <User className="h-3.5 w-3.5" /> 
              : <Bot className="h-3.5 w-3.5" />
            }
          </Avatar>
        </div>
        <div 
          className={`mx-2 px-3 py-2 rounded-lg ${
            message.sender === 'user' 
              ? 'bg-primary text-primary-foreground rounded-tr-none' 
              : 'bg-gray-200 dark:bg-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.text}</p>
          <div className={`text-xs mt-1 ${
            message.sender === 'user' 
              ? 'text-primary-foreground/70' 
              : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
