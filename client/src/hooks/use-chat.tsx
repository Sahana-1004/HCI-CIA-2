import { useChat as useChatContext } from "@/context/chat-context";

export const useChat = () => {
  return useChatContext();
};
