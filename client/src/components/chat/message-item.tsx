import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatMessage, ChatUser } from "@/context/chat-context";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  participants: ChatUser[];
}

export function MessageItem({ message, isCurrentUser, participants }: MessageItemProps) {
  const sender = isCurrentUser 
    ? { name: "You", avatar: "" } 
    : participants.find(p => p.id === message.senderId) || { name: "Unknown", avatar: "" };
  
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  // Function to highlight @mentions in message text
  const highlightMentions = (text: string) => {
    if (!message.mentions || message.mentions.length === 0) return text;
    
    const parts = [];
    let lastIndex = 0;
    
    message.mentions.forEach(mention => {
      const mentionText = `@${mention}`;
      const mentionIndex = text.indexOf(mentionText, lastIndex);
      
      if (mentionIndex >= 0) {
        // Add text before the mention
        if (mentionIndex > lastIndex) {
          parts.push(text.substring(lastIndex, mentionIndex));
        }
        
        // Add the highlighted mention
        parts.push(
          <span key={`mention-${mention}-${mentionIndex}`} className="text-blue-500 font-medium">
            {mentionText}
          </span>
        );
        
        lastIndex = mentionIndex + mentionText.length;
      }
    });
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };
  
  return (
    <div className={cn(
      "flex items-start",
      isCurrentUser ? "justify-end" : ""
    )}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        isCurrentUser ? "text-right" : ""
      )}>
        <div className={cn(
          "p-3 rounded-lg max-w-xs md:max-w-md",
          isCurrentUser 
            ? "bg-primary text-white" 
            : "bg-gray-100 dark:bg-gray-700"
        )}>
          <p className="text-sm">
            {
              typeof message.content === 'string' 
                ? highlightMentions(message.content)
                : message.content
            }
          </p>
          
          {message.type === "file" && message.attachment && (
            <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 flex items-center">
              <FileText className="text-red-500 mr-2 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">{message.attachment.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{message.attachment.size}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formattedTime}
          {isCurrentUser && message.read && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline-block h-3 w-3">
              <path d="M18 6L7 17L3 13" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
}
