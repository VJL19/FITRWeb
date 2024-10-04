import { useEffect, useState } from "react";
const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
export function useUserOnline() {
  const [isOnline, setIsOnline] = useState<boolean>(getOnLineStatus());
  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);
  useEffect(() => {
    //listens to any event emitted by the server and refetch the data
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return { isOnline };
}
