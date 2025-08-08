import React from "react";
import { BubbleButton } from "./BubbleButton";
import { Panel } from "./Panel";
import type { ChatWidgetProps } from "./types";
import styles from "./styles.css?inline";
import { injectStyles } from "./utils/injectStyles";

/**
 * Inject CSS on module load so users don't have to import it manually
 * This is a common pattern in React libraries to ensure styles are applied
 * without requiring the user to remember to import them.
 */
injectStyles(styles);

import { ChatProvider } from "./context/ChatContext";

/**
 * Internal component that uses the context and renders the chat UI
 * 
 * Renders the complete chat widget UI including:
 * - Chat panel with messages and input
 * - Bubble button for opening/closing
 * 
 * @returns {JSX.Element} The chat widget UI components
 */
const ChatWidgetInner: React.FC = () => {
  return (
    <div className="eloquent-chat">
      <Panel />
      <BubbleButton />
    </div>
  );
};

/**
 * EloquentAI Chat Widget - Main Component
 * 
 * A flexible, themeable React chat widget with TypeScript support.
 * Supports custom LLM integration, persistent storage, and external state control.
 * 
 * Key Features:
 * - Custom LLM integration via askLLM prop
 * - Theme customization with CSS custom properties
 * - Optional localStorage persistence
 * - External state management support
 * - Maintenance and offline modes
 * - Full TypeScript support
 * - Accessibility features
 * 
 * @param {ChatWidgetProps} props - Configuration props for the chat widget
 * @param {string} props.projectId - Required: Unique identifier for the chat instance
 * @param {boolean} [props.maintenance=false] - Optional: Enable maintenance mode
 * @param {boolean} [props.online=true] - Optional: Set online status
 * @param {Theme} [props.theme] - Optional: Custom theme colors
 * @param {boolean|null} [props.initialOpen=null] - Optional: Initial panel state
 * @param {boolean} [props.persist=true] - Optional: Enable localStorage persistence
 * @param {string} [props.userId] - Optional: User identifier
 * @param {Function} [props.askLLM] - Optional: Custom LLM function (message: string) => Promise<string>
 * @param {Message[]} [props.messages] - Optional: External message state
 * @param {Function} [props.handleSetMessage] - Optional: External message setter
 * @param {Function} [props.onLoadMessages] - Optional: External message loader
 * @param {Function} [props.onSaveMessages] - Optional: External message saver
 * 
 * @returns {JSX.Element} The complete chat widget wrapped in ChatProvider
 * 
 * @example
 * // Basic usage with mock LLM
 * <EloquentChatWidget projectId="my-app" />
 * 
 * @example
 * // With custom LLM and theme
 * <EloquentChatWidget 
 *   projectId="my-app"
 *   askLLM={async (msg) => await callMyLLM(msg)}
 *   theme={{ primary: "#007bff" }}
 * />
 */
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
