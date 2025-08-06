const cannedReplies = [
  "Sure! I'd be happy to help with that.",
  "Let me look into that for you.",
  "Thanks for reaching out — give me a moment.",
  "I understand. Here's what we can do...",
  "Great question! Here's what I found.",
  "That's an interesting issue — let's solve it together.",
  "Thanks! I'm processing that now...",
  "Got it. One sec while I check."
];

export async function askLLM(prompt: string): Promise<string> {
  await new Promise(r => setTimeout(r, 600)); // Simulate delay

  const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
  return reply;
}
