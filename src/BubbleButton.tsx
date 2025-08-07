import React from "react";
import { useChatWidget } from "./context/ChatContext";
import eloquentAILogoTransparent from "./assets/eloquent_ai_logo_transparent.png";

export const BubbleButton: React.FC = () => {
  const { isOpen, togglePanel, theme } = useChatWidget();

  return (
    <button
      className={`eloquent-chat__bubble`}
      aria-label="Open chat"
      onClick={togglePanel}
      style={
        {
          "--theme-primary": theme?.primary || "#007bff",
          backgroundColor: theme?.primary || "#007bff",
        } as React.CSSProperties
      }
    >
      {/* Background logo */}
      <div
        className={`eloquent-chat__bubble-logo ${isOpen ? "fade-out" : "fade-in"}`}
        style={{
          backgroundImage: `url(${eloquentAILogoTransparent})`,
        }}
      />

      {/* Close icon */}
      <span
        className={`eloquent-chat__bubble-close ${isOpen ? "fade-in" : "fade-out"}`}
      >
        ⌄
      </span>
    </button>
  );
};
