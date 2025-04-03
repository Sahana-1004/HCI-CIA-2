import { useState } from "react";
import { Bell, Search, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "@/components/accessibility/accessibility-menu";
import { formatDate } from "@/lib/utils";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6">
      <div className="flex-1 flex items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="ml-4 text-sm text-gray-500 dark:text-gray-400 hidden md:block">
          <span>Today: <span>{formatDate(new Date())}</span></span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsAccessibilityMenuOpen(!isAccessibilityMenuOpen)}
          >
            <Accessibility className="h-5 w-5" />
          </Button>
          
          {isAccessibilityMenuOpen && (
            <AccessibilityMenu 
              onClose={() => setIsAccessibilityMenuOpen(false)} 
            />
          )}
        </div>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <div>
          <Button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
}
