/**
 * EloquentAI Chat Widget - Main Export File
 * 
 * This file serves as the main entry point for the EloquentAI Chat Widget package.
 * It exports the main component and TypeScript types for external consumption.
 * 
 * @packageDocumentation
 */

/**
 * Main chat widget component
 * 
 * A flexible, themeable React chat widget with TypeScript support,
 * custom LLM integration, and persistent storage capabilities.
 */
export { EloquentChatWidget } from "./EloquentChatWidget";

/**
 * TypeScript type definitions
 * 
 * Exports the main types used by the chat widget for proper TypeScript support
 * in consuming applications.
 */
export type { ChatWidgetProps, Message, Theme } from "./types";