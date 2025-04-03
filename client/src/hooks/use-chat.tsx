import { useChat as useChatContext, ChatContext } from "@/context/chat-context";
import { useContext } from "react";

export const useChat = () => {
  try {
    return useChatContext();
  } catch (e) {
    // Return default values if context is not available
    return {
      conversations: [],
      activeConversation: null,
      messages: [],
      setActiveConversation: () => {},
      sendMessage: () => {},
      searchMessages: () => [],
      markAsRead: () => {},
      filterConversations: () => {},
      currentFilter: "all" as const
    };
  }
};
