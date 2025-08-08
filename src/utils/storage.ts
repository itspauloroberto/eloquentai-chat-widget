/**
 * Local Storage Utilities for Chat Persistence
 * 
 * Provides functions to save, load, and clear chat messages from localStorage.
 * Uses project-specific keys to avoid conflicts between different chat instances.
 */

import { Message } from "../types";

/**
 * Generates a unique localStorage key for a specific project
 * 
 * @param {string} projectId - The project identifier
 * @returns {string} The formatted localStorage key
 */
const key = (projectId: string) => `eloquent-chat:${projectId}`;

/**
 * Save messages to localStorage for a specific project
 * 
 * @param {string} projectId - The project identifier
 * @param {Message[]} msgs - Array of messages to save
 * 
 * @example
 * saveLocalStorage("my-app", [
 *   { id: "1", role: "user", text: "Hello", ts: Date.now() }
 * ]);
 */
export const saveLocalStorage = (projectId: string, msgs: Message[]) => 
  localStorage.setItem(key(projectId), JSON.stringify(msgs));

/**
 * Load messages from localStorage for a specific project
 * 
 * @param {string} projectId - The project identifier
 * @returns {Message[]} Array of loaded messages, or empty array if none exist
 * 
 * @example
 * const messages = loadLocalStorage("my-app");
 * console.log(messages); // Array of Message objects
 */
export const loadLocalStorage = (projectId: string): Message[] => 
  JSON.parse(localStorage.getItem(key(projectId)) || "[]");

/**
 * Clear all messages from localStorage for a specific project
 * 
 * @param {string} projectId - The project identifier
 * 
 * @example
 * clearLocalStorage("my-app"); // Removes all stored messages for this project
 */
export const clearLocalStorage = (projectId: string) => 
  localStorage.removeItem(key(projectId));