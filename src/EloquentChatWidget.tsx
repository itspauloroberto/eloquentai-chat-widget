import React from "react";
import { BubbleButton } from "./BubbleButton";
import { Panel } from "./Panel";
import type { ChatWidgetProps } from "./types";
import styles from "./styles.css";
import { injectStyles } from "./utils/injectStyles";

// Inject CSS on module load
injectStyles(styles);
// import "./styles.css";
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
	initialOpen = false,
	persist = true,
	userId,
	// External control props
	messages,
	onMessagesChange,
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
			externalMessages={messages}
			externalSetMessages={onMessagesChange}
			externalLoadMessages={onLoadMessages}
			externalSaveMessages={onSaveMessages}
		>
			<ChatWidgetInner />
		</ChatProvider>
	);
};

EloquentChatWidget.displayName = "EloquentChatWidget";
