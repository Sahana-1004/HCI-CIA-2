import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider";
import { SidebarProvider } from "./context/sidebar-context";
import { ChatProvider } from "./context/chat-context";
import { connectWebSocket } from "./lib/socket";

// Initialize WebSocket connection
connectWebSocket();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SidebarProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </SidebarProvider>
  </ThemeProvider>
);
