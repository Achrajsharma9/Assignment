import { useState } from "react";
import { Save, FolderOpen, Trash2, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface Template {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const defaultTemplates: Template[] = [
  {
    id: "1",
    name: "Code Review",
    content: "Please review the following code and provide feedback on:\n\n1. Code quality and structure\n2. Potential bugs or issues\n3. Performance optimizations\n4. Best practices adherence\n\nCode:\n```\n[INSERT CODE HERE]\n```",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Data Analysis",
    content: "Analyze the following dataset and provide insights on:\n\n1. Key patterns and trends\n2. Statistical significance\n3. Potential correlations\n4. Recommendations based on findings\n\nDataset:\n[INSERT DATA HERE]",
    createdAt: new Date("2024-01-10")
  },
  {
    id: "3",
    name: "Document Summary",
    content: "Please summarize the following document focusing on:\n\n1. Main points and key findings\n2. Important details and context\n3. Actionable recommendations\n4. Executive summary\n\nDocument:\n[INSERT DOCUMENT HERE]",
    createdAt: new Date("2024-01-05")
  }
];

export function PromptEditor({ value, onChange, placeholder, disabled }: PromptEditorProps) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim() || !value.trim()) return;

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: newTemplateName.trim(),
      content: value,
      createdAt: new Date()
    };

    setTemplates(prev => [newTemplate, ...prev]);
    setNewTemplateName("");
    setShowSaveDialog(false);
  };

  const handleLoadTemplate = (template: Template) => {
    onChange(template.content);
    setShowTemplates(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground">
          Prompt Editor
        </Label>
        <div className="flex items-center gap-2">
          {/* Save Template */}
          <Popover open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                disabled={!value.trim()}
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-3">
                <h4 className="text-sm">Save Template</h4>
                <div className="space-y-2">
                  <Label htmlFor="template-name" className="text-xs">
                    Template Name
                  </Label>
                  <Input
                    id="template-name"
                    placeholder="Enter template name..."
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveTemplate}
                    disabled={!newTemplateName.trim()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Load Template */}
          <Popover open={showTemplates} onOpenChange={setShowTemplates}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <FolderOpen className="h-3 w-3 mr-1" />
                Templates
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="p-4 border-b border-border">
                <h4 className="text-sm">Prompt Templates</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Load a saved template to get started quickly
                </p>
              </div>
              <ScrollArea className="max-h-80">
                <div className="p-2 space-y-1">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer group"
                      onClick={() => handleLoadTemplate(template)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm truncate">{template.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {template.createdAt.toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.content}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTemplate(template.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {templates.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <p className="text-sm">No templates saved yet</p>
                      <p className="text-xs mt-1">Save your first template to get started</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter your prompt here... Use templates to get started quickly with common use cases."}
        className="min-h-[200px] max-h-[400px] resize-y bg-card border-border focus:ring-2 focus:ring-ring/20 transition-all"
        disabled={disabled}
      />

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>{value.length} characters</span>
        <span>Ctrl+Enter to submit</span>
      </div>
    </div>
  );
}