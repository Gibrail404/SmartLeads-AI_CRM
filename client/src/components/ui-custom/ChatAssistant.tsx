
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { faqData, FaqItem } from './chat/faqData';

// Example message history
const initialMessages = [
  {
    id: '1',
    sender: 'bot' as const,
    text: 'Hello! I\'m your AI assistant. How can I help you with your CRM today?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const selectFaq = (faq: FaqItem) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text: `${faq.question}\n\n${faq.answer}`,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
    setShowFaq(false);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I can help with that! Let me analyze your data and provide some insights.",
        "Based on your leads data, I recommend following up with the high-scoring prospects first.",
        "Your sales pipeline shows 3 deals that need attention. Would you like me to schedule follow-up reminders?",
        "I've analyzed your customer interaction patterns. The best time to contact your leads is Tuesday morning.",
        "Your conversion rate has improved by 12% this month. Keep up the good work!",
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toISOString(),
      };
      
      setMessages(messages => [...messages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat trigger button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          {isOpen ? 
            <X className="h-5 w-5" /> : 
            <MessageCircle className="h-5 w-5" />
          }
        </Button>
      </motion.div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 'auto'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 w-80 sm:w-96 z-40"
          >
            <Card className="shadow-xl border-gray-200 dark:border-gray-800 overflow-hidden">
              <ChatHeader 
                isMinimized={isMinimized}
                toggleMinimize={toggleMinimize}
                toggleChat={toggleChat}
              />
              
              {!isMinimized && (
                <>
                  <MessageList 
                    messages={messages}
                    isTyping={isTyping}
                    formatTime={formatTime}
                  />
                  
                  <ChatInput 
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    sendMessage={sendMessage}
                    handleKeyPress={handleKeyPress}
                    showFaq={showFaq}
                    setShowFaq={setShowFaq}
                    faqData={faqData}
                    selectFaq={selectFaq}
                  />
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
