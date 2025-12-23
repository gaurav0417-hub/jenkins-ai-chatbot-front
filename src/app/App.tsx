import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import jenkinsLogo from '@/assets/ae3e1786afa2061b05b9afec5d1fd433cd2cc791.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Jenkins assistant. I can help you with CI/CD pipelines, build automation, deployment strategies, and general Jenkins configuration. How can I assist you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getJenkinsResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pipeline') || lowerMessage.includes('jenkinsfile')) {
      return 'Jenkins pipelines are defined using a Jenkinsfile, which can be written in either Declarative or Scripted syntax. Declarative Pipeline is recommended for most use cases as it provides a simpler, more structured syntax. Would you like an example of a basic Declarative Pipeline?';
    } else if (lowerMessage.includes('plugin')) {
      return 'Jenkins has a rich ecosystem of plugins. You can manage plugins through the Jenkins UI at "Manage Jenkins" > "Manage Plugins". Popular plugins include Git, Docker, Pipeline, and Blue Ocean. What specific functionality are you looking to add?';
    } else if (lowerMessage.includes('build') || lowerMessage.includes('job')) {
      return 'Jenkins jobs (or projects) define your build processes. You can create Freestyle projects for simple builds or Pipeline projects for more complex workflows. Jobs can be triggered manually, on a schedule, or by source control events like commits.';
    } else if (lowerMessage.includes('deploy')) {
      return 'Jenkins can automate deployments to various environments. Common approaches include using SSH, cloud provider plugins (AWS, Azure, GCP), container orchestration (Kubernetes), or deployment tools like Ansible. What\'s your target deployment environment?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I help you with Jenkins today?';
    } else {
      return 'I can help you with Jenkins CI/CD topics including pipelines, builds, deployments, plugins, and configuration. Could you provide more details about what you\'d like to know?';
    }
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getJenkinsResponse(text),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-32 h-32 rounded-lg bg-white flex items-center justify-center overflow-hidden">
            <img src={jenkinsLogo} alt="Jenkins" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Jenkins Assistant</h1>
            <p className="text-sm text-gray-500">CI/CD Pipeline Helper</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && (
            <div className="flex gap-4 p-4 bg-gray-50">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#D24939] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.52-3.09 8.73-7 9.78V4.18H12z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium">Jenkins Assistant</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}