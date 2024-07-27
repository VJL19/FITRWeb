import { useEffect } from "react";
import { io } from "socket.io-client";
import { loadConfig } from "src/global/config";

const socket = io("ws://localhost:8082/");
export function useRefetchOnMessage(messageType: string, dispatch: () => void) {
  useEffect(() => {
    const handleMessage = () => {
      dispatch();
    };

    //listens to any event emitted by the server and refetch the data
    socket?.on(messageType, handleMessage);

    return () => {
      socket?.off(messageType, handleMessage);
    };
  }, [messageType, dispatch]);
}
