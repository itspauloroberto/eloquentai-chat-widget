import React from "react";
import { BubbleButton } from "./BubbleButton";
import { Panel } from "./Panel";
import type { ChatWidgetProps } from "./types";
import styles from "./styles.css?inline";
import { injectStyles } from "./utils/injectStyles";

// Inject CSS on module load so the user dont have to import it manually
// This is a common pattern in React libraries to ensure styles are applied
// without requiring the user to remember to import them.
injectStyles(styles);

import { ChatProvider } from "./context/ChatContext";

// Internal component that uses the context
const ChatWidgetInner: React.FC = () => {
  return (
    <div className="eloquent-chat">
      <Panel />
      <BubbleButton />
    </div>
  );
};

// Main component that provides the context
export const EloquentChatWidget: React.FC<ChatWidgetProps> = ({
  projectId,
  maintenance = false,
  online = true,
  theme,
  initialOpen = null,
  persist = true,
  userId,
  askLLM,
  // External control props
  messages,
  handleSetMessage,
  onLoadMessages,
  onSaveMessages,
}) => {
  return (
    <ChatProvider
      projectId={projectId}
      userId={userId}
      theme={theme}
      initialOpen={initialOpen}
      persist={persist}
      maintenance={maintenance}
      online={online}
      askLLM={askLLM}
      externalMessages={messages}
      externalSetMessages={handleSetMessage}
      externalLoadMessages={onLoadMessages}
      externalSaveMessages={onSaveMessages}
    >
      <ChatWidgetInner />
    </ChatProvider>
  );
};

EloquentChatWidget.displayName = "EloquentChatWidget";
