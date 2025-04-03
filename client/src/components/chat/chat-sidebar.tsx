import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat, ChatConversation } from "@/context/chat-context";
import { cn, getInitials, getRelativeTime } from "@/lib/utils";

export function ChatSidebar() {
  const { conversations, filterConversations, currentFilter, setActiveConversation } = useChat();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => {
    if (currentFilter !== "all" && conversation.type !== currentFilter) {
      return false;
    }
    
    if (searchQuery) {
      return conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });
  
  const handleConversationClick = (conversation: ChatConversation) => {
    setActiveConversation(conversation);
  };
  
  return (
    <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Search */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-3 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Chat Types */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="all" onValueChange={(value) => filterConversations(value as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="group">Groups</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1 scrollbar-hide">
        <ul>
          {filteredConversations.map((conversation) => (
            <li key={conversation.id} className="border-b border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => handleConversationClick(conversation)}
                className="w-full text-left flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="relative">
                  {conversation.avatar ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.initials || getInitials(conversation.name)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-white font-medium",
                      conversation.type === "group" 
                        ? conversation.name.includes("Design") 
                          ? "bg-green-100 text-green-600" 
                          : conversation.name.includes("Marketing") 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    )}>
                      {conversation.initials || getInitials(conversation.name)}
                    </div>
                  )}
                  
                  <div className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
                    conversation.participants.some(p => p.status === "online") 
                      ? "bg-green-500" 
                      : "bg-gray-400"
                  )}></div>
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{conversation.name}</p>
                    {conversation.lastMessage && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getRelativeTime(conversation.lastMessage.timestamp)}
                      </p>
                    )}
                  </div>
                  
                  {conversation.lastMessage && (
                    <div className="flex items-center">
                      {conversation.unreadCount > 0 && (
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></span>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {conversation.type === "group" && `${conversation.lastMessage.sender.split(' ')[0]}: `}
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
