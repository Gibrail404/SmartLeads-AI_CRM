
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardFooter } from '@/components/ui/card';
import { HelpCircle, Send } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FaqItem {
  question: string;
  answer: string;
}

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  showFaq: boolean;
  setShowFaq: (show: boolean) => void;
  faqData: FaqItem[];
  selectFaq: (faq: FaqItem) => void;
}

const ChatInput = ({
  inputMessage,
  setInputMessage,
  sendMessage,
  handleKeyPress,
  showFaq,
  setShowFaq,
  faqData,
  selectFaq,
}: ChatInputProps) => {
  return (
    <CardFooter className="p-3 border-t">
      <div className="flex items-center w-full gap-2">
        <Popover open={showFaq} onOpenChange={setShowFaq}>
          <PopoverTrigger asChild>
            <Button 
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full flex-shrink-0"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-4 border-b">
              <h3 className="font-medium">Frequently Asked Questions</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {faqData.map((faq, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0"
                  onClick={() => selectFaq(faq)}
                >
                  <p className="font-medium text-sm">{faq.question}</p>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          size="icon"
          className="h-8 w-8 rounded-full flex-shrink-0"
          onClick={sendMessage}
          disabled={!inputMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </CardFooter>
  );
};

export default ChatInput;
