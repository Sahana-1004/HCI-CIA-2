// WebSocket connection utility
let socket: WebSocket | null = null;
let socketReconnectTimer: NodeJS.Timeout | null = null;

// Event callbacks storage
type MessageCallback = (data: any) => void;
const messageListeners: MessageCallback[] = [];

// Create and connect the WebSocket
export function connectWebSocket(): WebSocket {
  if (socket) {
    return socket;
  }
  
  // Determine the correct protocol (ws or wss) based on the current page protocol
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${window.location.host}/ws`;
  
  console.log(`Connecting to WebSocket at ${wsUrl}`);
  
  socket = new WebSocket(wsUrl);
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
    // Clear any reconnect timer if we successfully connected
    if (socketReconnectTimer) {
      clearTimeout(socketReconnectTimer);
      socketReconnectTimer = null;
    }
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      
      // Notify all listeners
      messageListeners.forEach(listener => listener(data));
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = (event) => {
    console.log(`WebSocket connection closed: code=${event.code}, reason=${event.reason}`);
    socket = null;
    
    // Attempt to reconnect after a delay
    if (!socketReconnectTimer) {
      socketReconnectTimer = setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        connectWebSocket();
      }, 5000);
    }
  };
  
  return socket;
}

// Send a message through the WebSocket
export function sendMessage(data: any): boolean {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('Cannot send message, WebSocket is not connected');
    return false;
  }
  
  try {
    socket.send(JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error sending WebSocket message:', error);
    return false;
  }
}

// Subscribe to incoming messages
export function subscribeToMessages(callback: MessageCallback): () => void {
  messageListeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = messageListeners.indexOf(callback);
    if (index !== -1) {
      messageListeners.splice(index, 1);
    }
  };
}

// Close the WebSocket connection
export function closeWebSocket(): void {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  if (socketReconnectTimer) {
    clearTimeout(socketReconnectTimer);
    socketReconnectTimer = null;
  }
}