/**
 * Mock LLM Implementation
 * 
 * Provides a simulated LLM experience for demonstration and testing purposes.
 * Returns random responses from a curated list of professional assistant replies.
 */
const cannedReplies = [
    "Sure! I'd be happy to help with that. Could you please provide a bit more detail so I can give you the most accurate information?",
    "Let me look into that for you. In the meantime, if you have any additional context or requirements, feel free to share them.",
    "Thanks for reaching out — give me a moment while I gather the relevant information for your question.",
    "I understand. Here's what we can do: I'll review your request and provide step-by-step guidance to address your issue.",
    "Great question! Here's what I found after checking several resources. Let me walk you through the solution.",
    "That's an interesting issue — let's solve it together. I'll outline the possible causes and suggest some troubleshooting steps.",
    "Thanks! I'm processing that now. I'll get back to you with a detailed response as soon as possible.",
    "Got it. One sec while I check. I'll make sure to include examples and references to help clarify the answer.",
    "I'm on it! I'll review your query and provide a comprehensive explanation, including any relevant code samples.",
    "Let me analyze your request. I'll break down the problem and offer a solution tailored to your needs.",
    "Thanks for your patience. I'm compiling the information and will respond with a thorough answer shortly.",
    "I appreciate your question. I'll research the topic and provide a detailed response, including best practices.",
    "I'm reviewing your issue now. I'll explain the reasoning behind the solution and offer alternative approaches if applicable.",
    "Thank you for reaching out! I'll make sure to address your question with clear instructions and helpful resources.",
    "Let me check the documentation and get back to you with a step-by-step guide to resolve your issue."
];

/**
 * Mock LLM Function
 * 
 * Simulates an LLM API call with realistic delay and random responses.
 * Used as fallback when no custom askLLM function is provided.
 * 
 * @param {string} _prompt - The user's message (ignored in mock implementation)
 * @returns {Promise<string>} A random professional response from the canned replies
 * 
 * @example
 * const response = await askLLM("Hello, how are you?");
 * console.log(response); // Returns one of the predefined responses
 */
export async function askLLM(_prompt: string): Promise<string> {
  // Simulate realistic API delay (600ms)
  await new Promise(r => setTimeout(r, 600));

  // Return a random response from the curated list
  const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
  return reply;
}
