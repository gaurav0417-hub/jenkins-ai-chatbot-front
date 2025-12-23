import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Jenkins anything..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#D24939] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '52px', maxHeight: '200px' }}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="absolute right-2 bottom-2 w-8 h-8 rounded-lg bg-[#D24939] text-white flex items-center justify-center hover:bg-[#B03E31] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
