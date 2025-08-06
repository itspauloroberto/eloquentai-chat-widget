import React, { useState } from "react";
import { EloquentChatWidget } from "../EloquentChatWidget";
import { demoStyles, demoThemes, demoConfigurations } from "./styles";

const Demo: React.FC = () => {
	const [selectedDemo, setSelectedDemo] = useState<string>("basic");
	const [selectedTheme, setSelectedTheme] = useState<string>("purple");

	const renderWidget = (selectedDemo: string) => {
		const baseProps = {
			projectId: `demo-${selectedDemo}`,
			userId: "demo-user-123",
			theme: demoThemes[selectedTheme],
		};

		switch (selectedDemo) {
			case "basic":
				return <EloquentChatWidget {...baseProps} />;

			case "no-persist":
				return <EloquentChatWidget {...baseProps} persist={false} />;

			case "initially-open":
				return <EloquentChatWidget {...baseProps} initialOpen={true} />;

			case "maintenance":
				return <EloquentChatWidget {...baseProps} maintenance={true} />;

			case "offline":
				return <EloquentChatWidget {...baseProps} online={false} />;

			default:
				return <EloquentChatWidget {...baseProps} />;
		}
	};

	return (
		<div style={demoStyles.container}>
			<h1 style={demoStyles.title}>EloquentAI Chat Widget Demo</h1>

			<div style={demoStyles.configurationCard}>
				<h2 style={demoStyles.sectionTitle}>Select Demo Configuration:</h2>

				<div style={demoStyles.demoGrid}>
					{demoConfigurations.map((demo) => (
						<button
							key={demo.id}
							onClick={() => setSelectedDemo(demo.id)}
							style={demoStyles.demoButton(selectedDemo === demo.id)}
						>
							<div style={demoStyles.demoButtonTitle}>{demo.title}</div>
							<div style={demoStyles.demoButtonDescription}>
								{demo.description}
							</div>
						</button>
					))}
				</div>

				<div style={demoStyles.configDisplay}>
					<h3 style={demoStyles.configTitle}>Current Configuration:</h3>
					<pre style={demoStyles.configCode}>
						{JSON.stringify(
							{
								projectId: `demo-${selectedDemo}`,
								userId: "demo-user-123",
								...(selectedDemo === "no-persist" && { persist: false }),
								...(selectedDemo === "initially-open" && { initialOpen: true }),
								...(selectedDemo === "maintenance" && { maintenance: true }),
								...(selectedDemo === "offline" && { online: false }),
								...(selectedDemo === "themed" && { theme: demoThemes.blue }),
							},
							null,
							2
						)}
					</pre>
				</div>
			</div>

			<div style={demoStyles.themeCard}>
				<h2 style={demoStyles.sectionTitle}>Theme Testing</h2>
				<div style={demoStyles.themeButtonContainer}>
					{Object.entries(demoThemes).map(([name, theme]) => (
						<button
							key={name}
							onClick={() => setSelectedTheme(name)}
							style={demoStyles.themeButton(theme.primary || "#007acc")}
							onMouseEnter={() => {
								// TODO: Temporarily apply theme for preview
							}}
						>
							{name}
						</button>
					))}
				</div>
				<p style={demoStyles.themeNote}>
					Click a color to preview that theme, or select "Custom Theme" above.
				</p>
			</div>

			<div style={demoStyles.instructionsCard}>
				<h2 style={demoStyles.sectionTitle}>Instructions</h2>
				<ul style={demoStyles.instructionsList}>
					<li>The chat widget will appear in the bottom-right corner</li>
					<li>Click the bubble button to open/close the chat panel</li>
					<li>Try different configurations to see how they behave</li>
					<li>Messages are persisted in localStorage (unless disabled)</li>
					<li>The LLM responses are mocked for demo purposes</li>
					<li>
						Each demo uses a different projectId to keep conversations separate
					</li>
				</ul>
			</div>

			{/* Render the selected widget */}
			{renderWidget(selectedDemo)}
			{/* TODO: Add theme preview */}
			{/* TODO: Add section to change user id */}
		</div>
	);
};

export default Demo;
