export type Message = { id: string; role: "user" | "assistant" | "error"; text: string; ts: number };

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
