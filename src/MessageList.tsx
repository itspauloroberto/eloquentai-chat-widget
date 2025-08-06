import React from "react";
import { useChatWidget } from "./context/ChatContext";

export const MessageList: React.FC = () => {
	const { messages } = useChatWidget();

	return (
		<div className="eloquent-chat__messages" role="log" aria-live="polite">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`eloquent-chat__msg ${msg.role}`}
					aria-label={`${msg.role === "user" ? "You" : "Assistant"}: ${
						msg.text
					}`}
				>
					{msg.text}
				</div>
			))}
		</div>
	);
};
