"use client";

import { useEffect, useState } from "react";
import { onConnectionStatusChange, ConnectionStatus } from "@/lib/socket";

export default function ConnectionStatusIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isConnecting: false,
    error: null,
    reconnectAttempts: 0,
  });

  useEffect(() => {
    const unsubscribe = onConnectionStatusChange(setStatus);
    return unsubscribe;
  }, []);

  if (status.isConnected) {
    return (
      <div className="connection-status status-connected animate-slide-in">
        <span className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></span>
        <span className="font-semibold">Connected</span>
      </div>
    );
  }

  if (status.isConnecting) {
    return (
      <div className="connection-status status-connecting animate-slide-in">
        <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin"></div>
        <span className="font-semibold">Reconnecting…</span>
        {status.reconnectAttempts > 0 && (
          <span className="text-xs opacity-75 ml-1">({status.reconnectAttempts})</span>
        )}
      </div>
    );
  }

  return (
    <div className="connection-status status-disconnected animate-slide-in">
      <span className="w-2 h-2 bg-danger rounded-full"></span>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Disconnected</span>
        {status.error && (
          <span className="text-xs opacity-75">
            {status.error}
          </span>
        )}
      </div>
    </div>
  );
}
