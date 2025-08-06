import { Message } from "../types";

const key = (projectId: string) => `eloquent-chat:${projectId}`;

export const saveLocalStorage = (projectId: string, msgs: Message[]) => localStorage.setItem(key(projectId), JSON.stringify(msgs));
export const loadLocalStorage = (projectId: string): Message[] => JSON.parse(localStorage.getItem(key(projectId)) || "[]");
export const clearLocalStorage = (projectId: string) => localStorage.removeItem(key(projectId));