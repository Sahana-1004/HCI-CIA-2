import { createContext, useContext, useState, useEffect } from "react";
import { mockChatConversations, mockChatMessages } from "@/data/mock-data";
import { sendMessage as sendWebSocketMessage, subscribeToMessages } from "@/lib/socket";

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  role?: string;
  status: "online" | "offline" | "away";
  lastActive?: string;
}

export interface ChatConversation {
  id: string;
  type: "private" | "group";
  name: string;
  participants: ChatUser[];
  lastMessage?: {
    sender: string;
    content: string;
    timestamp: Date;
    read: boolean;
  };
  unreadCount: number;
  avatar?: string;
  initials?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "file" | "image";
  attachment?: {
    name: string;
    type: string;
    size: string;
    url: string;
  };
  mentions?: string[];
  priority?: "normal" | "important" | "urgent";
}

interface ChatContextType {
  conversations: ChatConversation[];
  activeConversation: ChatConversation | null;
  messages: ChatMessage[];
  setActiveConversation: (conversation: ChatConversation) => void;
  sendMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  searchMessages: (query: string) => ChatMessage[];
  markAsRead: (messageId: string) => void;
  filterConversations: (type: "all" | "private" | "group") => void;
  currentFilter: "all" | "private" | "group";
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockChatConversations);
  const [activeConversation, setActiveConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [currentFilter, setCurrentFilter] = useState<"all" | "private" | "group">("all");

  // Subscribe to WebSocket messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages((data) => {
      if (data.messageType === 'chat_message') {
        // Create a new message from the WebSocket data
        const newMessage: ChatMessage = {
          id: data.id || Date.now().toString(),
          conversationId: data.conversationId,
          senderId: data.senderId,
          content: data.content,
          timestamp: new Date(data.timestamp || Date.now()),
          read: false,
          type: data.contentType || "text",
        };
        
        // Add the message to the state
        setMessages((prev) => [...prev, newMessage]);
        
        // Update last message in conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === newMessage.conversationId 
              ? {
                  ...conv,
                  lastMessage: {
                    sender: newMessage.senderId,
                    content: newMessage.content,
                    timestamp: new Date(newMessage.timestamp),
                    read: false
                  }
                }
              : conv
          )
        );
      }
    });
    
    return () => {
      unsubscribe(); // Clean up subscription when component unmounts
    };
  }, []); // Empty dependency array means this runs once on mount

  const sendMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    // Create a WebSocket message object
    const wsMessage = {
      messageType: 'chat_message',
      conversationId: message.conversationId,
      senderId: message.senderId,
      content: message.content,
      contentType: message.type,
      attachment: message.attachment,
      mentions: message.mentions,
      priority: message.priority,
      timestamp: new Date().toISOString()
    };
    
    // Send the message through WebSocket
    sendWebSocketMessage(wsMessage);
    
    // We'll receive the message back through the WebSocket,
    // but we'll also update the UI immediately for better UX
    setMessages((prev) => [...prev, newMessage]);
    
    // Update last message in conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.id === message.conversationId 
          ? {
              ...conv,
              lastMessage: {
                sender: message.senderId,
                content: message.content,
                timestamp: new Date(),
                read: false
              }
            }
          : conv
      )
    );
  };

  const searchMessages = (query: string): ChatMessage[] => {
    if (!query.trim()) return [];
    const lowercaseQuery = query.toLowerCase();
    return messages.filter(message => 
      message.content.toLowerCase().includes(lowercaseQuery)
    );
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const filterConversations = (type: "all" | "private" | "group") => {
    setCurrentFilter(type);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        setActiveConversation,
        sendMessage,
        searchMessages,
        markAsRead,
        filterConversations,
        currentFilter
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
