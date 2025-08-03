
import { useRef, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  formatTime: (timestamp: string) => string;
}

const MessageList = ({ messages, isTyping, formatTime }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <CardContent className="p-0">
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            formatTime={formatTime}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </CardContent>
  );
};

export default MessageList;
