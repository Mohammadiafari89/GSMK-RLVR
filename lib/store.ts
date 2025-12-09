import { create } from "zustand";
import { agents } from "@/data";

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    isUser: boolean;
}

export interface ChatUser {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: string;
    timestamp?: string;
}

export interface Agent {
    id: string;
    name: string;
    avatar: string;
    video?: string;
    website: string;
    telegram: string;
    twitter: string;
    contract: string;
    token: string;
    members: number;
    another?: string;
    desc: string;
    subDesc: string;
}

interface ChatStore {
    selectedChat: ChatUser | null;
    messages: Message[];
    setSelectedChat: (chat: ChatUser) => void;
    addMessage: (message: Message) => void;
}

export interface AgentStore {
    selectedAgent: Agent | null;
    setSelectedAgent: (agent: Agent) => void;
    selectedChat: ChatUser | null;
    setSelectedChat: (chat: ChatUser | null) => void;
    isCreatingAgent: boolean;
    setIsCreatingAgent: (isCreating: boolean) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
    selectedAgent: agents[0],
    setSelectedAgent: (agent) => set({ selectedAgent: agent }),
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    isCreatingAgent: false,
    setIsCreatingAgent: (isCreating) => set({ isCreatingAgent: isCreating }),
}));