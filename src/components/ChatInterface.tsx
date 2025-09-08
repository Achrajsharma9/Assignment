import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { ModelSelector } from "./ModelSelector";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatInterface({ selectedModel, onModelChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from ${selectedModel}. I understand your query: "${input}". In a real implementation, this would be connected to the selected AI model to provide actual responses.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h1 className="text-lg">AI Assessment Tool</h1>
          <p className="text-sm text-muted-foreground">
            Ask questions, analyze content, and get AI-powered insights
          </p>
        </div>
        <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="max-w-md">
              <h2 className="text-xl mb-2">Start a conversation</h2>
              <p className="text-muted-foreground mb-6">
                Choose a model above and ask a question to begin your AI assessment session.
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                  "Analyze this dataset and provide insights..."
                </div>
                <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                  "Help me understand this complex topic..."
                </div>
                <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                  "Review this code for potential issues..."
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-2 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="max-w-[80%] p-4 rounded-lg bg-muted mr-12">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t border-border">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question or prompt here... (Press Enter to send, Shift+Enter for new line)"
              className="min-h-[60px] max-h-[200px] resize-none bg-input border-border focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="h-10 w-10"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI responses are simulated in this demo. Connect to real AI services for production use.
        </p>
      </div>
    </div>
  );
}