import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#D24939] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-medium">
            {isUser ? 'You' : 'Jenkins Assistant'}
          </span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <div className="text-gray-800 whitespace-pre-wrap break-words">
          {message}
        </div>
      </div>
    </div>
  );
}
