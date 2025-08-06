import React from "react";
import { MessageList } from "./MessageList";
import { InputBar } from "./InputBar";
import { useChatWidget } from "./context/ChatContext";

export const Panel: React.FC = () => {
	const { isOpen, closePanel, isMaintenanceMode, isOnline } = useChatWidget();

	if (!isOpen) return null;

	return (
		<div className="eloquent-chat__panel" role="dialog" aria-modal="false">
			<header className="eloquent-chat__header">
				<span>Eloquent Support</span>
				<span
					className={`eloquent-chat__status ${isOnline ? "online" : "offline"}`}
				>
					{isOnline ? "Online" : "Offline"}
				</span>
				<button onClick={closePanel} aria-label="Close">
					×
				</button>
			</header>

			{isMaintenanceMode && (
				<div className="eloquent-chat__banner" role="status">
					Maintenance mode: sending disabled
				</div>
			)}

			<MessageList />

			<InputBar />
		</div>
	);
};
