import { useState, useEffect, useCallback } from "react";
import { Send, MessageSquarePlus, History, Settings, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { Badge } from "./components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { ModelSelector } from "./components/ModelSelector";
import { PromptEditor } from "./components/PromptEditor";
import { ParametersPanel } from "./components/ParametersPanel";
import { OutputArea } from "./components/OutputArea";
import { ThemeToggle } from "./components/ThemeToggle";
import { toast, Toaster } from "sonner";

interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface OutputData {
  content: string;
  model: string;
  timestamp: Date;
  parameters?: ModelParameters;
  metadata?: {
    tokens: number;
    processingTime: number;
  };
}

const defaultParameters: ModelParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
};

export default function App() {
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4");
  const [prompt, setPrompt] = useState("");
  const [parameters, setParameters] = useState<ModelParameters>(defaultParameters);
  const [output, setOutput] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    const startTime = Date.now();

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

      // Simulate potential error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("API request failed. Please try again.");
      }

      const processingTime = Date.now() - startTime;
      const responseLength = Math.floor(Math.random() * 500) + 100;
      const estimatedTokens = Math.floor(responseLength / 4);

      const mockResponse = `This is a simulated response from ${selectedModel}. 

Your prompt: "${prompt.substring(0, 100)}${prompt.length > 100 ? "..." : ""}"

Model Parameters Used:
• Temperature: ${parameters.temperature}
• Max Tokens: ${parameters.maxTokens}
• Top P: ${parameters.topP}
• Frequency Penalty: ${parameters.frequencyPenalty}
• Presence Penalty: ${parameters.presencePenalty}

In a production environment, this would be replaced with actual AI model responses. The response would be generated based on your specific prompt and the configured parameters.

This simulation demonstrates the complete workflow of AI Arena, including parameter configuration, response generation, and result presentation with metadata.`;

      const newOutput: OutputData = {
        content: mockResponse,
        model: selectedModel,
        timestamp: new Date(),
        parameters: { ...parameters },
        metadata: {
          tokens: estimatedTokens,
          processingTime,
        },
      };

      setOutput(newOutput);
      toast.success("Response generated successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, parameters, selectedModel]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNewAssessment = () => {
    setPrompt("");
    setOutput(null);
    setError(null);
    setParameters(defaultParameters);
    toast.success("New assessment started");
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDark ? "dark" : ""}`}>
      <TooltipProvider>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-14 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4 flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={handleNewAssessment}
                >
                  <MessageSquarePlus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New Assessment</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <History className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">History</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>

            <Separator className="w-8 bg-sidebar-border" />

            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg">AI Arena</h1>
                    <p className="text-sm text-muted-foreground">
                      Professional AI analysis with customizable parameters
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">
                    TypeScript + Tailwind
                  </Badge>
                  <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 p-6 gap-6 grid grid-cols-1 lg:grid-cols-3 min-h-0">
              {/* Left Column - Input & Parameters */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      Input Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PromptEditor
                      value={prompt}
                      onChange={setPrompt}
                      disabled={isLoading}
                      placeholder="Enter your assessment prompt here... Use Ctrl+Enter to submit."
                    />

                    <Separator />

                    <ParametersPanel
                      parameters={parameters}
                      onParametersChange={setParameters}
                      disabled={isLoading}
                    />

                    <Button
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || isLoading}
                      className="w-full h-10"
                      size="sm"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Generate Assessment
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Output */}
              <div className="lg:col-span-2 flex flex-col min-h-0">
                <OutputArea
                  output={output}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
      <Toaster 
        theme={isDark ? "dark" : "light"}
        position="bottom-right"
        richColors
      />
    </div>
  );
}