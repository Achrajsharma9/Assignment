import { useState } from "react";
import { Copy, Download, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

interface OutputData {
  content: string;
  model: string;
  timestamp: Date;
  parameters?: Record<string, any>;
  metadata?: {
    tokens: number;
    processingTime: number;
  };
}

interface OutputAreaProps {
  output: OutputData | null;
  isLoading: boolean;
  error: string | null;
}

export function OutputArea({ output, isLoading, error }: OutputAreaProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output?.content) return;

    try {
      await navigator.clipboard.writeText(output.content);
      setCopied(true);
      toast.success("Response copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownloadJSON = () => {
    if (!output) return;

    const jsonData = {
      response: output.content,
      model: output.model,
      timestamp: output.timestamp.toISOString(),
      parameters: output.parameters,
      metadata: output.metadata,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-response-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Response downloaded as JSON");
  };

  return (
    <Card className="flex-1 flex flex-col min-h-0 border-border/50">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            AI Response
            {output && (
              <Badge variant="secondary" className="text-xs">
                {output.model}
              </Badge>
            )}
          </CardTitle>
          {output && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-3 text-xs"
                disabled={!output.content}
              >
                {copied ? (
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadJSON}
                className="h-8 px-3 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                JSON
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 pt-0">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Generating response...</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  This may take a few seconds
                </p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && !output && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2 max-w-md">
              <p className="text-sm text-muted-foreground">
                AI responses will appear here
              </p>
              <p className="text-xs text-muted-foreground/70">
                Enter a prompt above and click send to get started
              </p>
            </div>
          </div>
        )}

        {output && !isLoading && (
          <div className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1">
              <div className="pr-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {output.content}
                </div>
              </div>
            </ScrollArea>

            {/* Metadata */}
            {output.metadata && (
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>Tokens:</span>
                  <Badge variant="outline" className="text-xs">
                    {output.metadata.tokens}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span>Time:</span>
                  <Badge variant="outline" className="text-xs">
                    {output.metadata.processingTime}ms
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span>Generated:</span>
                  <Badge variant="outline" className="text-xs">
                    {output.timestamp.toLocaleTimeString()}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}