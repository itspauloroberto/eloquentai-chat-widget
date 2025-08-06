import React, { useState } from "react";
import { useChatWidget } from "./context/ChatContext";

export const InputBar: React.FC = () => {
	const { sendMessage, isSending, isMaintenanceMode } = useChatWidget();
	const [text, setText] = useState("");

	const handleSend = () => {
		const trimmed = text.trim();
		if (!trimmed) return;
		sendMessage(trimmed);
		setText("");
	};

	return (
		<form
			className="eloquent-chat__input"
			onSubmit={(e) => {
				e.preventDefault();
				if (!isSending) handleSend();
			}}
		>
			<input
				type="text"
				aria-label="Type your message"
				placeholder={
					isSending || isMaintenanceMode
						? "Service unavailable"
						: "Type your message..."
				}
				disabled={isSending || isMaintenanceMode}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				type="submit"
				disabled={isSending || !text.trim() || isMaintenanceMode}
			>
				Send
			</button>
		</form>
	);
};
