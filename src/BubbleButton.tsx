import React from "react";
import { useChatWidget } from "./context/ChatContext";

export const BubbleButton: React.FC = () => {
	const { isOpen, togglePanel, theme } = useChatWidget();

	return (
		<button
			className="eloquent-chat__bubble"
			aria-label="Open chat"
			onClick={togglePanel}
			style={{
				backgroundColor: theme?.primary || "#007bff",
			}}
		>
			{isOpen ? "x" : "💬"}
		</button>
	);
};
