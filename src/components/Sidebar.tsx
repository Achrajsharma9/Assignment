import { MessageSquarePlus, History, Settings, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onNewChat: () => void;
}

export function Sidebar({ currentView, onViewChange, onNewChat }: SidebarProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "chat", icon: MessageSquarePlus, label: "New Chat", action: onNewChat },
    { id: "history", icon: History, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-14 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4">
      <TooltipProvider>
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === item.id ? "default" : "ghost"}
                size="icon"
                className={`h-10 w-10 ${
                  currentView === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    onViewChange(item.id);
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}