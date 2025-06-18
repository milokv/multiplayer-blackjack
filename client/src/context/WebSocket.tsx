import { createContext, useContext, useEffect, useRef } from "react";

type WebSocketContextType = {
    socket: React.RefObject<WebSocket | null>;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3001");

    socket.current.onopen = () => {
        console.log("✅ WebSocket connected");
    };

    socket.current.onclose = () => {
        console.log("❌ WebSocket disconnected");
    };

    socket.current.onerror = (err) => {
        console.error("WebSocket error:", err);
    };

    socket.current.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
    };

    return () => {
        socket.current?.close();
    };
}, []);

    return (
    <WebSocketContext.Provider value={{ socket }}>
        {children}
    </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
        if (!context) throw new Error("useWebSocket must be used inside WebSocketProvider");
    return context;
};

