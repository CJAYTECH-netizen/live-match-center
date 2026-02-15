import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let reconnectAttempts = 0;
let maxAttemptsReached = false;
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY = 3000;

export interface ConnectionStatus {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  reconnectAttempts: number;
}

let connectionStatusCallbacks: ((status: ConnectionStatus) => void)[] = [];

const getConnectionStatus = (): ConnectionStatus => {
  return {
    isConnected: socket?.connected ?? false,
    isConnecting: socket !== null && !socket.connected && !maxAttemptsReached,
    error: null,
    reconnectAttempts,
  };
};

const notifyConnectionStatusChange = () => {
  const status = getConnectionStatus();
  connectionStatusCallbacks.forEach((cb) => cb(status));
};

export const connectSocket = (): Socket => {
  if (socket?.connected) {
    return socket;
  }

  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3000";
    
    socket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: RECONNECT_DELAY,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 3,
      reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
      reconnectAttempts = 0;
      maxAttemptsReached = false;
      notifyConnectionStatusChange();
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      notifyConnectionStatusChange();
    });

    socket.on("connect_error", (error) => {
      // Silently ignore connection errors - websocket server may not be available
      reconnectAttempts++;
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        maxAttemptsReached = true;
        // Stop trying to reconnect
        socket?.disconnect();
      }
      notifyConnectionStatusChange();
    });

    socket.on("error", (error) => {
      // Silently ignore errors - websocket server may not be available
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
    maxAttemptsReached = false;
  }
};

export const getSocket = (): Socket | null => socket;

export const onConnectionStatusChange = (
  callback: (status: ConnectionStatus) => void
): (() => void) => {
  connectionStatusCallbacks.push(callback);
  // Call immediately with current status
  callback(getConnectionStatus());
  // Return unsubscribe function
  return () => {
    connectionStatusCallbacks = connectionStatusCallbacks.filter((cb) => cb !== callback);
  };
};

export const subscribeToMatch = (matchId: string) => {
  const socket = connectSocket();
  socket.emit("subscribe_match", { matchId });
};

export const unsubscribeFromMatch = (matchId: string) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("unsubscribe_match", { matchId });
  }
};

export const joinChat = (matchId: string, userId: string, username: string) => {
  const socket = connectSocket();
  socket.emit("join_chat", { matchId, userId, username });
};

export const leaveChat = (matchId: string, userId: string) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("leave_chat", { matchId, userId });
  }
};

export const sendChatMessage = (
  matchId: string,
  userId: string,
  username: string,
  message: string
) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("send_message", { matchId, userId, username, message });
  }
};

export const startTyping = (matchId: string, userId: string, username: string) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("typing_start", { matchId, userId, username });
  }
};

export const stopTyping = (matchId: string, userId: string) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("typing_stop", { matchId, userId });
  }
};
