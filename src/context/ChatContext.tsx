import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Message, Theme } from "../types";
import { loadLocalStorage, saveLocalStorage } from "../utils/storage";
import { askLLM } from "../utils/mockLLM";

// Define the context state interface
interface ChatContextState {
  // Core state
  projectId: string;
  userId?: string;
  messages: Message[];
  isOpen: boolean | null;
  isSending: boolean;
  isOnline: boolean;
  isMaintenanceMode: boolean;
  theme?: Theme;
  persist: boolean;

  // Actions/Methods
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;

  // Configuration setters
  setProjectId: (projectId: string) => void;
  setUserId: (userId?: string) => void;
  setTheme: (theme?: Theme) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setMaintenanceMode: (isMaintenanceMode: boolean) => void;
  setPersist: (persist: boolean) => void;
}

// Create the context
const ChatContext = createContext<ChatContextState | undefined>(undefined);

// Props for the provider
interface ChatProviderProps {
  children: React.ReactNode;
  // Initial configuration
  projectId: string;
  userId?: string;
  theme?: Theme;
  initialOpen?: boolean | null;
  persist?: boolean;
  maintenance?: boolean;
  online?: boolean;

  // External control overrides (hybrid approach)
  externalMessages?: Message[];
  externalSetMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  externalLoadMessages?: () => Message[];
  externalSaveMessages?: (messages: Message[]) => void;
}

const SYSTEM_OFFLINE_MESSAGE =
  "The system is currently offline. Please try again later.";

// Chat Provider Component
export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  projectId: initialProjectId,
  userId: initialUserId,
  theme: initialTheme,
  initialOpen = null,
  persist: initialPersist = true,
  maintenance = false,
  online = true,
  // External overrides
  externalMessages,
  externalSetMessages,
  externalLoadMessages,
  externalSaveMessages,
}) => {
  // Individual state variables for better performance
  const [projectId, setProjectId] = useState(initialProjectId);
  const [userId, setUserId] = useState(initialUserId);
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isSending, setIsSending] = useState(false);
  const [isOnline, setIsOnline] = useState(online);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(maintenance);
  const [theme, setTheme] = useState(initialTheme);
  const [persist, setPersist] = useState(initialPersist);

  // Use external messages if provided, otherwise use internal state
  const messages = externalMessages || internalMessages;
  const setMessages = externalSetMessages || setInternalMessages;

  // Readability helpers
  const clearMessages = () => setMessages([]);
  const togglePanel = () => setIsOpen((prev) => !prev);
  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);

  // Sync setup props to reflect into local state when they are changed
  useEffect(() => setProjectId(initialProjectId), [initialProjectId]);
  useEffect(() => setUserId(initialUserId), [initialUserId]);
  useEffect(() => setTheme(initialTheme), [initialTheme]);
  useEffect(() => setIsOnline(online), [online]);
  useEffect(() => setIsMaintenanceMode(maintenance), [maintenance]);
  useEffect(() => setPersist(initialPersist), [initialPersist]);

  // Auto-load messages when configurations are changed
  useEffect(() => {
    if (!projectId || !persist) {
      clearMessages();
      return;
    }
    // Use external load function if provided, otherwise load from localStorage
    setMessages(
      externalLoadMessages
        ? externalLoadMessages()
        : loadLocalStorage(projectId)
    );
  }, [projectId, persist, externalLoadMessages, setMessages]);

  // Auto-save messages that got added
  useEffect(() => {
    if (!projectId || !persist || messages.length === 0) return;

    if (externalSaveMessages) {
      externalSaveMessages(messages);
    } else {
      saveLocalStorage(projectId, messages);
    }
  }, [projectId, messages, persist, externalSaveMessages]);

  // Message operations
  const sendMessage = useCallback(
    async (text: string) => {
      if (isMaintenanceMode || !text.trim() || isSending) return;

      // Default internal send logic
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text,
        ts: Date.now(),
      };

      // Add user message to the messages list
      setMessages((prev) => [...prev, userMsg]);

      setIsSending(true);

      try {
        const reply = isOnline ? await askLLM(text) : SYSTEM_OFFLINE_MESSAGE;
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply,
          ts: Date.now(),
        };

        // Add bot response
        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSending(false);
      }
    },
    [isMaintenanceMode, isSending, isOnline, setMessages]
  );

  // Context value
  const contextValue: ChatContextState = {
    // State
    projectId,
    userId,
    messages,
    isOpen,
    isSending,
    isOnline,
    isMaintenanceMode,
    theme,
    persist,

    // Actions
    togglePanel,
    openPanel,
    closePanel,
    sendMessage,
    clearMessages,

    // Setters
    setProjectId,
    setUserId,
    setTheme,
    setOnlineStatus: setIsOnline,
    setMaintenanceMode: setIsMaintenanceMode,
    setPersist,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChatWidget = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatWidget must be used within a ChatProvider");
  }
  return context;
};

// Export the context for advanced use cases
export { ChatContext };
