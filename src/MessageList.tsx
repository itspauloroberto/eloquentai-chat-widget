import React, { useEffect, useRef, useState } from "react";
import { useChatWidget } from "./context/ChatContext";
import eloquentAILogo from "./assets/eloquent_ai_logo.jpeg";

/**
 * MessageList Component
 * 
 * Renders the list of chat messages with auto-scrolling, typewriter effects,
 * and dynamic styling based on message roles (user, assistant, error).
 * 
 * Features:
 * - Auto-scroll to bottom on new messages
 * - Typewriter animation for assistant messages
 * - Theme integration via CSS custom properties
 * - Logo display for last assistant message
 * - Accessibility support with ARIA labels
 * 
 * @returns {JSX.Element} The rendered message list component
 */
export const MessageList: React.FC = () => {
  const { messages, theme } = useChatWidget();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  /**
   * Tracks which assistant messages have completed their typewriter animation
   * Used to apply different styling once typing is complete
   */
  const [completedTyping, setCompletedTyping] = useState<Set<string>>(
    new Set()
  );

  /**
   * Auto-scroll to bottom when new messages arrive
   * Provides smooth scrolling behavior for better UX
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Handles the completion of typewriter animation for assistant messages
   * Updates the completedTyping state to apply post-animation styling
   * 
   * @param {string} messageId - The unique identifier of the message
   * @param {boolean} isAssistant - Whether the message is from an assistant
   */
  const handleAnimationEnd = (messageId: string, isAssistant: boolean) => {
    if (isAssistant) {
      setCompletedTyping((prev) => new Set(prev).add(messageId));
    }
  };

  return (
    <div
      className="eloquent-chat__messages"
      role="log"
      aria-live="polite"
      style={
        {
          // Pass theme primary color to CSS custom property for dynamic theming
          "--theme-primary": theme?.primary || "#111",
          // Pass logo URL as CSS custom property for the last assistant message
          "--logo-url": `url(${eloquentAILogo})`,
        } as React.CSSProperties
      }
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`eloquent-chat__msg ${msg.role} ${
            // Add 'typing-complete' class when assistant message animation finishes
            msg.role === "assistant" && completedTyping.has(msg.id)
              ? "typing-complete"
              : ""
          }`}
          aria-label={`${
            // Provide descriptive ARIA labels for screen readers
            msg.role === "user" ? "You" : msg.role === "assistant" ? "Assistant" : "Error"
          }: ${msg.text}`}
          onAnimationEnd={() =>
            handleAnimationEnd(msg.id, msg.role === "assistant")
          }
        >
          {msg.text}
        </div>
      ))}
      {/* Invisible element used as scroll target for auto-scroll behavior */}
      <div ref={messagesEndRef} />
    </div>
  );
};
