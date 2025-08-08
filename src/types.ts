/**
 * Message object representing a single chat message
 * 
 * @interface Message
 * @property {string} id - Unique identifier for the message (typically UUID)
 * @property {"user" | "assistant" | "error"} role - The sender/type of the message
 * @property {string} text - The actual message content
 * @property {number} ts - Timestamp when the message was created (Date.now())
 */
export type Message = { 
  id: string; 
  role: "user" | "assistant" | "error"; 
  text: string; 
  ts: number 
};

/**
 * Theme configuration for customizing chat widget appearance
 * 
 * @interface Theme
 * @property {string} [primary] - Primary color used for buttons and user messages
 * @property {string} [accent] - Secondary accent color
 * @property {string} [bubbleColor] - Specific override for bubble button color
 */
export type Theme = {
  primary?: string;
  accent?: string;
  bubbleColor?: string;
};

/**
 * Props for the main EloquentChatWidget component
 * 
 * @interface ChatWidgetProps
 * @property {string} projectId - Required: Unique identifier for the chat instance
 * @property {boolean} [maintenance] - Optional: Enable maintenance mode (disables sending)
 * @property {boolean} [online] - Optional: Set online status (affects LLM calls)
 * @property {Theme} [theme] - Optional: Custom theme colors
 * @property {boolean|null} [initialOpen] - Optional: Initial panel state (null prevents animations)
 * @property {boolean} [persist] - Optional: Enable localStorage persistence
 * @property {string} [userId] - Optional: User identifier for personalization
 * @property {(message: string) => Promise<string>} [askLLM] - Optional: Custom LLM function
 * 
 * External control overrides (for advanced use cases):
 * @property {Message[]} [messages] - External message state override
 * @property {React.Dispatch<React.SetStateAction<Message[]>>} [handleSetMessage] - External message setter
 * @property {(text: string) => Promise<void>} [onSendMessage] - External send message handler
 * @property {() => Message[]} [onLoadMessages] - External message loader
 * @property {(messages: Message[]) => void} [onSaveMessages] - External message saver
 */
export type ChatWidgetProps = {
  projectId: string;
  maintenance?: boolean;
  online?: boolean;
  theme?: Theme;
  initialOpen?: boolean | null;
  persist?: boolean; // localStorage
  userId?: string;   // mock identity
  askLLM?: (message: string) => Promise<string>; // Custom LLM function
  
  // External control overrides
  messages?: Message[];
  handleSetMessage?: React.Dispatch<React.SetStateAction<Message[]>>;
  onSendMessage?: (text: string) => Promise<void>;
  onLoadMessages?: () => Message[];
  onSaveMessages?: (messages: Message[]) => void;
};
