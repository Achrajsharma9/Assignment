import { useState } from "react";
import { ChevronDown, Check, Brain, Zap, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
}

const models: Model[] = [
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    description: "Most advanced reasoning and analysis capabilities",
    icon: Sparkles,
    category: "Premium"
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Powerful language model for complex tasks",
    icon: Brain,
    category: "Standard"
  },
  {
    id: "llama",
    name: "Llama",
    description: "Open-source model for efficient processing",
    icon: Zap,
    category: "Open Source"
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="justify-between p-2 h-auto bg-muted/50 hover:bg-muted border border-border/50 min-w-[200px]"
        >
          <div className="flex items-center gap-2">
            <currentModel.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{currentModel.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-popover border-border" align="start">
        <div className="p-4">
          <h3 className="mb-3 text-sm text-muted-foreground">Choose Model</h3>
          <div className="space-y-1">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                onClick={() => {
                  onModelChange(model.id);
                  setOpen(false);
                }}
              >
                <model.icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{model.name}</span>
                    {model.id === selectedModel && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}