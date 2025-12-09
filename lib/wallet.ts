"use client";

export type PhantomEvent = "disconnect" | "connect" | "accountChanged";

export interface PhantomProvider {
    removeAllListeners(arg0: string): unknown;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, callback: (args: any) => void) => void;
    isPhantom: boolean;
    publicKey: { toString: () => string } | null;
}

export const getProvider = (): PhantomProvider | undefined => {
    if (typeof window !== "undefined") {
        const provider = (window as any).solana;
        if (provider?.isPhantom) return provider;
    }
}; 