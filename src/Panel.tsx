import React from "react";
import { MessageList } from "./MessageList";
import { InputBar } from "./InputBar";
import { useChatWidget } from "./context/ChatContext";
import eloquentAILogo from "./assets/eloquent_ai_logo.jpeg";

export const Panel: React.FC = () => {
  const { isOpen, isMaintenanceMode, isOnline, messages } = useChatWidget();

  return (
    <div
      className={`eloquent-chat__panel ${isOpen === null ? "block-animation" : ""} ${isOpen ? "panel-open" : "panel-closed"}`}
      role="dialog"
      aria-modal="false"
    >
      <header className="eloquent-chat__header">
        <img
          src={eloquentAILogo}
          alt="Eloquent AI"
          style={{ width: 32, height: 32 }}
        />
        <h5>Eloquent AI</h5>
        <small
          className={`eloquent-chat__status ${isOnline ? "online" : "offline"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </small>
      </header>

      {isMaintenanceMode && (
        <div className="eloquent-chat__banner" role="status">
          Maintenance mode: sending disabled
        </div>
      )}

      <div
        className={`eloquent-chat__intro ${messages.length > 0 || isOpen === false ? "fade-out" : ""}`}
      >
        <img
          src={eloquentAILogo}
          alt="Eloquent AI"
          style={{ width: 55, height: 55 }}
        />
        <h5>Eloquent AI responds instantly</h5>
        <small>Ask me anything</small>
      </div>

      {isOpen === true || messages.length > 0 ? (
        <MessageList />
      ) : (
        <div className={`eloquent-chat__messages-placeholder`} />
      )}

      <InputBar />
    </div>
  );
};
