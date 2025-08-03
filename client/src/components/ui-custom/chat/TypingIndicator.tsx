
import { Avatar } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] flex-row">
        <div className="flex-shrink-0 mt-1">
          <Avatar className="h-7 w-7 bg-primary/20 text-primary">
            <Bot className="h-3.5 w-3.5" />
          </Avatar>
        </div>
        <div className="mx-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 rounded-tl-none">
          <div className="flex space-x-1 items-center h-5">
            <div className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
