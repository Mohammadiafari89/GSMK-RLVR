"use client";

import { useAgentStore } from "@/lib/store";
import AgentProfile from "./agent-profile";
import Chat from "./chat";
import ChatOneToOne from "./chat-one-to-one";
import CreateAgent from "./create-agent";
import Header from "./header";
import { useEffect } from "react";

export default function AgentProfileWrapper() {
  const selectedChat = useAgentStore((state) => state.selectedChat);
  const isCreatingAgent = useAgentStore((state) => state.isCreatingAgent);
  const setIsCreatingAgent = useAgentStore((state) => state.setIsCreatingAgent);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);
  const setSelectedChat = useAgentStore((state) => state.setSelectedChat);

  // Hide create agent UI when clan is selected
  useEffect(() => {
    if (selectedAgent) {
      setIsCreatingAgent(false);
    }
  }, [selectedAgent, setIsCreatingAgent]);

  // Hide chat 1-1 when creating agent
  useEffect(() => {
    if (isCreatingAgent) {
      setSelectedChat(null);
    }
  }, [isCreatingAgent, setSelectedChat]);

  return (
    <div className="flex-1">
      {!selectedChat && !isCreatingAgent && <Header />}
      {selectedChat ? (
        // Show 1-1 chat when message is selected
        <div className="h-screen">
          <ChatOneToOne />
        </div>
      ) : isCreatingAgent ? (
        // Show create agent UI when creating
        <div className="h-screen">
          <CreateAgent />
        </div>
      ) : (
        // Show clan content (profile + group chat) when viewing clan
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-[calc(100vh-64px)] p-4 lg:p-0">
          <div className="w-full lg:w-auto">
            <AgentProfile />
          </div>
          <div className="flex-1 min-w-0 h-full max-h-full overflow-hidden">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
}
