"use client";

import { useEffect, useRef, useState } from "react";
import { connectSocket, getSocket, joinChat, leaveChat, sendChatMessage, startTyping, stopTyping } from "@/lib/socket";
import { ChatMessage, TypingIndicator } from "@/app/types/match";

const TYPING_TIMEOUT = 3000; // Stop typing indicator after 3 seconds

interface ChatBoxProps {
  matchId: string;
  userId: string;
  username: string;
}

export default function ChatBox({ matchId, userId, username }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Connect to socket and join chat
  useEffect(() => {
    const socket = connectSocket();
    joinChat(matchId, userId, username);

    // Listen for incoming messages
    const handleChatMessage = (data: ChatMessage) => {
      if (data.matchId === matchId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    // Listen for typing indicators
    const handleTypingIndicator = (data: TypingIndicator) => {
      if (data.matchId === matchId && data.userId !== userId) {
        setTypingUsers((prev) => ({
          ...prev,
          [data.userId]: data.isTyping,
        }));
      }
    };

    socket.on("chat_message", handleChatMessage);
    socket.on("typing_indicator", handleTypingIndicator);

    // Cleanup
    return () => {
      socket.off("chat_message", handleChatMessage);
      socket.off("typing_indicator", handleTypingIndicator);
      leaveChat(matchId, userId);
    };
  }, [matchId, userId, username]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // Send typing indicator
    startTyping(matchId, userId, username);

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(matchId, userId);
    }, TYPING_TIMEOUT);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    if (newMessage.length > 500) {
      alert("Message is too long (max 500 characters)");
      return;
    }

    setIsLoading(true);
    sendChatMessage(matchId, userId, username, newMessage);
    setNewMessage("");

    // Stop typing indicator
    stopTyping(matchId, userId);

    setIsLoading(false);
  };

  const typingUsersList = Object.entries(typingUsers)
    .filter(([_, isTyping]) => isTyping)
    .map(([userId]) => userId);

  return (
    <div className="flex flex-col h-full card border-2 border-background-tertiary">
      {/* Header */}
      <div className="border-b border-background-tertiary px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-r from-background-secondary to-background-tertiary/50">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-text-primary">Live Chat</h3>
          <p className="text-xs text-text-tertiary">Match Discussion</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></span>
          <span className="text-xs text-text-secondary font-medium">Active</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
            <div className="text-3xl mb-2">💬</div>
            <p className="text-xs sm:text-sm text-center">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-xs ${msg.userId === userId ? "chat-message chat-message-own" : "chat-message chat-message-other"}`}>
                <div className="font-semibold text-xs mb-1 opacity-80">
                  {msg.userId === userId ? "You" : msg.username}
                </div>
                <p className="break-words text-sm">{msg.message}</p>
                <div className="text-xs opacity-60 mt-1 leading-none">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {typingUsersList.length > 0 && (
          <div className="flex gap-2 items-center py-2 px-2 animate-slide-in">
            <div className="typing-indicator">
              <span className="typing-dot" style={{ animationDelay: "0s" }}></span>
              <span className="typing-dot" style={{ animationDelay: "0.2s" }}></span>
              <span className="typing-dot" style={{ animationDelay: "0.4s" }}></span>
            </div>
            <span className="text-xs text-text-tertiary truncate font-medium">
              {typingUsersList.length === 1
                ? "Someone is typing…"
                : `${typingUsersList.length} people are typing…`}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="border-t border-background-tertiary p-3 sm:p-4 bg-background-secondary/50">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message…"
            maxLength={500}
            className="input flex-1"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            className="btn btn-primary px-4"
            title={!newMessage.trim() ? "Type a message first" : "Send message"}
          >
            <span className="hidden sm:inline">Send</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-tertiary">Max 500 characters</span>
          <span className={`text-xs font-semibold ${newMessage.length > 450 ? "text-warning" : "text-text-muted"}`}>
            {newMessage.length}/500
          </span>
        </div>
      </form>
    </div>
  );
}
