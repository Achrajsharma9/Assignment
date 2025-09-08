import { useState } from "react";
import { Settings, RotateCcw } from "lucide-react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Badge } from "./ui/badge";

interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface ParametersPanelProps {
  parameters: ModelParameters;
  onParametersChange: (parameters: ModelParameters) => void;
  disabled?: boolean;
}

const defaultParameters: ModelParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
};

export function ParametersPanel({ parameters, onParametersChange, disabled }: ParametersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleParameterChange = (key: keyof ModelParameters, value: number) => {
    onParametersChange({
      ...parameters,
      [key]: value,
    });
  };

  const resetToDefaults = () => {
    onParametersChange(defaultParameters);
  };

  const hasChanges = JSON.stringify(parameters) !== JSON.stringify(defaultParameters);

  return (
    <Card className="border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Model Parameters
                {hasChanges && (
                  <Badge variant="secondary" className="text-xs">
                    Modified
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                disabled={!hasChanges || disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  resetToDefaults();
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            {/* Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Temperature</Label>
                <Input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={parameters.temperature}
                  onChange={(e) => handleParameterChange('temperature', parseFloat(e.target.value) || 0)}
                  className="w-20 h-7 text-xs"
                  disabled={disabled}
                />
              </div>
              <Slider
                value={[parameters.temperature]}
                onValueChange={([value]) => handleParameterChange('temperature', value)}
                min={0}
                max={2}
                step={0.1}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls randomness. Lower values for focused, higher for creative responses.
              </p>
            </div>

            {/* Max Tokens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Max Tokens</Label>
                <Input
                  type="number"
                  min="1"
                  max="8192"
                  value={parameters.maxTokens}
                  onChange={(e) => handleParameterChange('maxTokens', parseInt(e.target.value) || 1)}
                  className="w-24 h-7 text-xs"
                  disabled={disabled}
                />
              </div>
              <Slider
                value={[parameters.maxTokens]}
                onValueChange={([value]) => handleParameterChange('maxTokens', value)}
                min={1}
                max={8192}
                step={1}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maximum length of the generated response.
              </p>
            </div>

            {/* Top P */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Top P</Label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={parameters.topP}
                  onChange={(e) => handleParameterChange('topP', parseFloat(e.target.value) || 0)}
                  className="w-20 h-7 text-xs"
                  disabled={disabled}
                />
              </div>
              <Slider
                value={[parameters.topP]}
                onValueChange={([value]) => handleParameterChange('topP', value)}
                min={0}
                max={1}
                step={0.1}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls diversity via nucleus sampling. Alternative to temperature.
              </p>
            </div>

            {/* Frequency Penalty */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Frequency Penalty</Label>
                <Input
                  type="number"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={parameters.frequencyPenalty}
                  onChange={(e) => handleParameterChange('frequencyPenalty', parseFloat(e.target.value) || 0)}
                  className="w-20 h-7 text-xs"
                  disabled={disabled}
                />
              </div>
              <Slider
                value={[parameters.frequencyPenalty]}
                onValueChange={([value]) => handleParameterChange('frequencyPenalty', value)}
                min={-2}
                max={2}
                step={0.1}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Reduces repetition of frequent tokens. Positive values discourage repetition.
              </p>
            </div>

            {/* Presence Penalty */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Presence Penalty</Label>
                <Input
                  type="number"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={parameters.presencePenalty}
                  onChange={(e) => handleParameterChange('presencePenalty', parseFloat(e.target.value) || 0)}
                  className="w-20 h-7 text-xs"
                  disabled={disabled}
                />
              </div>
              <Slider
                value={[parameters.presencePenalty]}
                onValueChange={([value]) => handleParameterChange('presencePenalty', value)}
                min={-2}
                max={2}
                step={0.1}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Encourages talking about new topics. Positive values increase likelihood of new topics.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}