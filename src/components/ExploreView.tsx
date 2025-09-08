import { Search, Sparkles, Code, Image, FileText, BarChart, Brain, Zap } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  tags: string[];
  featured?: boolean;
}

const explorationModels: Model[] = [
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Advanced reasoning, analysis, and creative writing with exceptional performance on complex tasks",
    icon: Sparkles,
    category: "General",
    tags: ["Text", "Analysis", "Creative"],
    featured: true
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Large multimodal model with strong performance across diverse domains and reasoning tasks",
    icon: Brain,
    category: "General",
    tags: ["Text", "Multimodal", "Reasoning"]
  },
  {
    id: "code-expert",
    name: "Code Expert",
    description: "Specialized model for programming, debugging, code review, and software architecture",
    icon: Code,
    category: "Development",
    tags: ["Code", "Debug", "Architecture"],
    featured: true
  },
  {
    id: "vision-pro",
    name: "Vision Pro",
    description: "Advanced computer vision model for image analysis, object detection, and visual reasoning",
    icon: Image,
    category: "Vision",
    tags: ["Image", "Computer Vision", "Analysis"]
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Specialized for data analysis, statistical modeling, and generating insights from datasets",
    icon: BarChart,
    category: "Analytics",
    tags: ["Data", "Statistics", "Insights"],
    featured: true
  },
  {
    id: "document-pro",
    name: "Document Pro",
    description: "Optimized for document processing, summarization, and information extraction",
    icon: FileText,
    category: "Documents",
    tags: ["Documents", "Summarization", "Extraction"]
  },
  {
    id: "quick-assistant",
    name: "Quick Assistant",
    description: "Fast, efficient model for quick queries, simple tasks, and rapid prototyping",
    icon: Zap,
    category: "Utility",
    tags: ["Quick", "Efficient", "Simple"]
  }
];

interface ExploreViewProps {
  onModelSelect: (modelId: string) => void;
  onStartChat: () => void;
}

export function ExploreView({ onModelSelect, onStartChat }: ExploreViewProps) {
  const categories = Array.from(new Set(explorationModels.map(m => m.category)));
  const allTags = Array.from(new Set(explorationModels.flatMap(m => m.tags)));

  const handleModelClick = (modelId: string) => {
    onModelSelect(modelId);
    onStartChat();
  };

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl mb-2">Explore AI Models</h1>
        <p className="text-muted-foreground mb-6">
          Discover specialized AI models for different tasks and use cases
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models, capabilities, or use cases..."
            className="pl-10 max-w-md"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-accent">
            All Models
          </Badge>
          {allTags.map((tag) => (
            <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Models */}
      <div className="mb-8">
        <h2 className="text-lg mb-4">Featured Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {explorationModels.filter(m => m.featured).map((model) => (
            <Card key={model.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20" onClick={() => handleModelClick(model.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <model.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {model.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {model.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Models */}
      <div>
        <h2 className="text-lg mb-4">All Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {explorationModels.map((model) => (
            <Card key={model.id} className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary/20" onClick={() => handleModelClick(model.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <model.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm truncate">{model.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {model.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {model.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {model.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}