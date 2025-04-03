import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Set up WebSocket server for chat functionality
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients = new Map();
  
  wss.on('connection', (ws) => {
    const userId = Date.now().toString(); // In a real app, this would be authenticated
    clients.set(userId, ws);
    
    // Send welcome message
    ws.send(JSON.stringify({
      messageType: 'connection',
      status: 'connected',
      userId: userId,
      timestamp: new Date().toISOString()
    }));
    
    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        
        // Add timestamp and sender ID if not present
        const enhancedMessage = {
          ...parsedMessage,
          timestamp: parsedMessage.timestamp || new Date().toISOString(),
          senderId: parsedMessage.senderId || userId,
          id: parsedMessage.id || Date.now().toString()
        };
        
        // Log the received message
        console.log('WebSocket message received:', enhancedMessage);
        
        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(enhancedMessage));
          }
        });
        
        // In a real app, we would save the message to a database
        if (parsedMessage.messageType === 'chat_message') {
          // Save the message but don't wait for it - just log for now
          try {
            console.log('Would save message to database:', {
              conversationId: parseInt(enhancedMessage.conversationId),
              senderId: parseInt(enhancedMessage.senderId),
              content: enhancedMessage.content,
              type: enhancedMessage.contentType || "text",
              attachment: enhancedMessage.attachment,
              mentions: enhancedMessage.mentions,
              priority: enhancedMessage.priority || "normal"
            });
            
            // In a real app with a proper database schema, we would save it
            // storage.createMessage({...}).catch(err => console.error('Error saving message:', err));
          } catch (err) {
            console.error('Error preparing message for storage:', err);
          }
        }
        
      } catch (error) {
        console.error('Invalid message format', error);
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      clients.delete(userId);
    });
  });
  
  // API routes
  // Users
  app.get('/api/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
  
  // Chats
  app.get('/api/conversations', async (req, res) => {
    try {
      const conversations = await storage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });
  
  app.get('/api/conversations/:id', async (req, res) => {
    try {
      const conversation = await storage.getConversationById(req.params.id);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  });
  
  app.get('/api/conversations/:id/messages', async (req, res) => {
    try {
      const messages = await storage.getMessagesByConversationId(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });
  
  app.post('/api/conversations', async (req, res) => {
    try {
      const conversation = await storage.createConversation(req.body);
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create conversation' });
    }
  });
  
  app.post('/api/messages', async (req, res) => {
    try {
      const message = await storage.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  });
  
  // Dashboard data
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  });
  
  app.get('/api/dashboard/pending-work', async (req, res) => {
    try {
      const pendingWork = await storage.getPendingWorkData();
      res.json(pendingWork);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pending work data' });
    }
  });
  
  app.get('/api/dashboard/performance', async (req, res) => {
    try {
      const performance = await storage.getPerformanceData();
      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance data' });
    }
  });
  
  app.get('/api/dashboard/completed-work', async (req, res) => {
    try {
      const completedWork = await storage.getCompletedWorkData();
      res.json(completedWork);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch completed work data' });
    }
  });
  
  app.get('/api/dashboard/notifications', async (req, res) => {
    try {
      const notifications = await storage.getNotificationsData();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications data' });
    }
  });
  
  app.get('/api/dashboard/project-success', async (req, res) => {
    try {
      const projectSuccess = await storage.getProjectSuccessData();
      res.json(projectSuccess);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project success data' });
    }
  });
  
  app.get('/api/dashboard/workload', async (req, res) => {
    try {
      const workload = await storage.getWorkloadData();
      res.json(workload);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch workload data' });
    }
  });

  return httpServer;
}
