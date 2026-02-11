"use client";

import { useState } from "react";
import ChatBox from "./ChatBox";

interface ChatWidgetProps {
  matchId: string;
  userId: string;
  username: string;
}

export default function ChatWidget({ matchId, userId, username }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        title="Open chat"
      >
        <div className="relative">
          {/* Pulsing ring animation */}
          <div className="absolute -inset-2 bg-accent/20 rounded-full animate-pulse-glow scale-0 group-hover:scale-100 transition-transform"></div>

          {/* Main button */}
          <div className="relative w-14 h-14 rounded-full bg-accent hover:bg-cyan-500 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer">
            <span className="text-2xl">💬</span>
            
            {/* Notification dot (optional - could show new messages) */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-live rounded-full border-2 border-background-primary animate-pulse-subtle"></div>
          </div>
        </div>
      </button>

      {/* Chat Modal/Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Chat Panel */}
          <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 h-screen sm:h-[600px] sm:rounded-t-xl overflow-hidden animate-slide-in">
            <div className="card border-2 border-background-tertiary overflow-hidden flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-background-tertiary bg-gradient-to-r from-background-secondary to-background-tertiary/50">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-text-primary">Live Chat</h3>
                  <p className="text-xs text-text-tertiary">Match Discussion</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-background-secondary flex items-center justify-center transition-colors text-text-tertiary hover:text-text-primary"
                  title="Close chat"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>

              {/* Chat Content */}
              <ChatBox
                matchId={matchId}
                userId={userId}
                username={username}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
