export type Message = { id: string; role: "user" | "assistant"; text: string; ts: number };

export type Theme = {
  primary?: string;
  accent?: string;
  bubbleColor?: string;
};

export type ChatWidgetProps = {
  projectId: string;
  maintenance?: boolean;
  online?: boolean;
  theme?: Theme;
  initialOpen?: boolean;
  persist?: boolean; // localStorage
  userId?: string;   // mock identity
  
  // External control overrides (hybrid approach)
  messages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onSendMessage?: (text: string) => Promise<void>;
  onLoadMessages?: () => Message[];
  onSaveMessages?: (messages: Message[]) => void;
};
