import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Slider } from './ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const [copiedId, setCopiedId] = useState(null);
  const isUser = message.role === 'user';

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-[85%] lg:max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center mb-1.5 space-x-2">
          <span className="text-xs font-medium text-gray-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {isUser ? (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return inline ? (
                      <code className="bg-gray-200 text-gray-900 px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="relative my-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 bg-gray-200 hover:bg-gray-300"
                          onClick={() => copyToClipboard(String(children), message.id)}
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    );
                  },
                  p: ({ children }) => <p className="text-[15px] leading-relaxed mb-3 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-[15px]">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatsPage = () => {
  const { currentChatId, getCurrentChat, addMessage, createNewChat, getCurrentModelData } = useApp();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [topP, setTopP] = useState([0.9]);
  const scrollRef = useRef(null);

  const currentChat = getCurrentChat();
  const currentModel = getCurrentModelData();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  const simulateResponse = async (userMessage) => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = [
      `I understand your question about "${userMessage.slice(0, 30)}...". Based on the ${currentModel?.name || 'current model'}, here's my response:\n\nThis is a simulated response running locally on your device. The actual LLM integration would provide real-time responses based on your hardware capabilities.\n\n**Key Points:**\n- Processing happens entirely on your machine\n- No data sent to external servers\n- Response quality depends on model size and your hardware\n\nIs there anything specific you'd like me to elaborate on?`,
      `That's an interesting question! Let me break this down for you:\n\n1. **First consideration**: The topic you're asking about requires careful analysis\n2. **Second point**: Local models provide privacy-first responses\n3. **Third aspect**: Your ${currentModel?.ramNeeded || '6 GB'} RAM setup handles this well\n\nWould you like me to dive deeper into any of these points?`,
      `Based on your query, here's what I can tell you:\n\n\`\`\`\nExample code or explanation\nwould appear here formatted\nappropriately for your question\n\`\`\`\n\nThis demonstrates how code blocks are rendered. The response quality and speed depend on your local model configuration.\n\n**Note**: All processing is done locally for maximum privacy!`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const assistantMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: randomResponse,
      timestamp: new Date().toISOString()
    };

    addMessage(currentChatId, assistantMessage);
    setIsGenerating(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    let chatId = currentChatId;
    if (!chatId) {
      const newChat = createNewChat();
      chatId = newChat.id;
    }

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    addMessage(chatId, userMessage);
    setInput('');

    await simulateResponse(userMessage.content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 px-4 lg:px-6" ref={scrollRef}>
          <div className="max-w-4xl mx-auto py-8">
            {!currentChat || currentChat.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Start a conversation
                </h2>
                <p className="text-gray-600 max-w-md">
                  Ask anything about your local models. All processing happens on your device.
                </p>
              </div>
            ) : (
              currentChat.messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {isGenerating && (
              <div className="flex justify-start mb-6">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-gray-200 bg-white px-4 lg:px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mb-2">
                    <Sliders className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Generation Settings</SheetTitle>
                    <SheetDescription>
                      Adjust parameters for response generation
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Temperature: {temperature[0]}
                      </label>
                      <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        min={0}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Higher values make output more random
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Max Tokens: {maxTokens[0]}
                      </label>
                      <Slider
                        value={maxTokens}
                        onValueChange={setMaxTokens}
                        min={256}
                        max={4096}
                        step={256}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum length of generated response
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Top P: {topP[0]}
                      </label>
                      <Slider
                        value={topP}
                        onValueChange={setTopP}
                        min={0}
                        max={1}
                        step={0.05}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Nucleus sampling threshold
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your local models..."
                  className="min-h-[52px] max-h-[200px] resize-none pr-12 text-[15px] leading-relaxed"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="bg-blue-600 hover:bg-blue-700 h-[52px] px-5"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Your queries run locally on your device. Model performance depends on your hardware.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex w-72 border-l border-gray-200 bg-gray-50 p-6">
        <div className="w-full">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Current Model</h3>
          {currentModel ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{currentModel.name}</p>
                <p className="text-xs text-gray-500">{currentModel.source}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium text-gray-900">{currentModel.downloadSize}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">RAM needed:</span>
                  <span className="font-medium text-gray-900">{currentModel.ramNeeded}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Parameters</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-medium text-gray-900">{temperature[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max tokens:</span>
                    <span className="font-medium text-gray-900">{maxTokens[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top P:</span>
                    <span className="font-medium text-gray-900">{topP[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No model selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
