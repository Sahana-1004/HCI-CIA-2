import { useState, useRef, useEffect } from "react";
import { Phone, Video, Info, Paperclip, AtSign, Flag, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat, ChatMessage, ChatUser } from "@/context/chat-context";
import { MessageItem } from "./message-item";
import { getRelativeTime } from "@/lib/utils";

export function ChatMain() {
  const { activeConversation, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversationMessages = messages.filter(
    (message) => activeConversation && message.conversationId === activeConversation.id
  );
  
  // Group messages by date
  const groupedMessages: { [key: string]: ChatMessage[] } = {};
  conversationMessages.forEach((message) => {
    const date = message.timestamp.toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    sendMessage({
      conversationId: activeConversation.id,
      senderId: "current-user", // In a real app, this would be the current user's ID
      content: newMessage,
      read: true,
      type: "text",
    });
    
    setNewMessage("");
  };
  
  if (!activeConversation) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden justify-center items-center">
        <div className="text-center p-6">
          <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a conversation from the list to start chatting
          </p>
        </div>
      </div>
    );
  }
  
  // Find the main participant (for private chats)
  const mainParticipant = activeConversation.type === "private"
    ? activeConversation.participants.find(p => p.id !== "current-user")
    : null;
  
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            {mainParticipant ? (
              <Avatar>
                <AvatarImage src={mainParticipant.avatar} alt={mainParticipant.name} />
                <AvatarFallback>{mainParticipant.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                {activeConversation.initials || activeConversation.name.charAt(0)}
              </div>
            )}
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${
              mainParticipant?.status === "online" ? "bg-green-500" : "bg-gray-400"
            } rounded-full border-2 border-white dark:border-gray-800`}></div>
          </div>
          <div className="ml-3">
            <p className="font-medium">{activeConversation.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {mainParticipant 
                ? `Last active ${mainParticipant.lastActive || "recently"}` 
                : `${activeConversation.participants.length} members`}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
                  {new Date(date).toDateString() === new Date().toDateString()
                    ? "Today"
                    : new Date(date).toDateString() === new Date(Date.now() - 86400000).toDateString()
                    ? "Yesterday"
                    : new Date(date).toLocaleDateString()}
                </div>
              </div>
              
              {/* Messages for this date */}
              {groupedMessages[date].map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === "current-user"}
                  participants={activeConversation.participants}
                />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 mb-2">
          <Button type="button" variant="ghost" size="icon">
            <Smile className="h-5 w-5 text-gray-500" />
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <AtSign className="h-5 w-5 text-gray-500" />
          </Button>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              className="w-full px-3 py-2 pr-8"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-3 space-x-1">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Flag className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
          <Button type="submit" size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
