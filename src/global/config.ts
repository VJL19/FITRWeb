interface IConfig {
  BASE_URL: string;
  SOCKET_URL: string;
}

export function loadConfig(): IConfig {
  return {
    BASE_URL: import.meta.env.VITE_PUBLIC_BASE_SERVER_URL,
    SOCKET_URL: import.meta.env.VITE_PUBLIC_SOCKET_URL,
  };
}
