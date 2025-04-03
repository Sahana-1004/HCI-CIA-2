import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { useChat } from "@/hooks/use-chat";

export function Chat() {
  const { setActiveConversation, conversations } = useChat();
  
  const handleNewChat = () => {
    // In a real application, this would create a new conversation
    // and open it in the chat main area
    alert("Create new chat functionality would be implemented here");
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Chat</h1>
          <p className="text-gray-500 dark:text-gray-400">Communicate and collaborate with your team</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={handleNewChat} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 h-full">
        <ChatSidebar />
        <ChatMain />
      </div>
    </div>
  );
}
