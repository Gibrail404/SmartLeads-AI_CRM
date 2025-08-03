
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Bot, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  toggleChat: () => void;
}

const ChatHeader = ({ isMinimized, toggleMinimize, toggleChat }: ChatHeaderProps) => {
  return (
    <CardHeader className="p-4 bg-primary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 bg-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium flex items-center">
              AI Assistant
              <Link to="/premium-plans">
                <Badge className="ml-2 bg-primary/20 text-primary text-xs font-normal px-1.5 py-0 h-5 rounded-full flex items-center cursor-pointer hover:bg-primary/30 transition-colors">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>Pro</span>
                </Badge>
              </Link>
            </CardTitle>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={toggleMinimize}
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={toggleChat}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
