import React, { useEffect, useRef, useState } from "react";
import { useChatWidget } from "./context/ChatContext";

export const MessageList: React.FC = () => {
  const { messages } = useChatWidget();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [completedTyping, setCompletedTyping] = useState<Set<string>>(
    new Set()
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle typewriter completion for assistant messages
  const handleAnimationEnd = (messageId: string, isAssistant: boolean) => {
    if (isAssistant) {
      setCompletedTyping((prev) => new Set(prev).add(messageId));
    }
  };

  return (
    <div className="eloquent-chat__messages" role="log" aria-live="polite">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`eloquent-chat__msg ${msg.role} ${
            msg.role === "assistant" && completedTyping.has(msg.id)
              ? "typing-complete"
              : ""
          }`}
          aria-label={`${msg.role === "user" ? "You" : "Assistant"}: ${
            msg.text
          }`}
          onAnimationEnd={() =>
            handleAnimationEnd(msg.id, msg.role === "assistant")
          }
        >
          {msg.text}
        </div>
      ))}
      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};
