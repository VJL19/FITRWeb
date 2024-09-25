interface IConfig {
  BASE_URL: string;
  SOCKET_URL: string;
  FIREBASE_APIKEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_DATABASE_URL: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
}

export function loadConfig(): IConfig {
  return {
    BASE_URL: import.meta.env.VITE_PUBLIC_BASE_SERVER_URL,
    SOCKET_URL: import.meta.env.VITE_PUBLIC_BASE_SOCKET_URL,
    FIREBASE_APIKEY: import.meta.env.VITE_PUBLIC_BASE_apiKey,
    FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_PUBLIC_BASE_authDomain,
    FIREBASE_DATABASE_URL: import.meta.env.VITE_PUBLIC_BASE_databaseURL,
    FIREBASE_PROJECT_ID: import.meta.env.VITE_PUBLIC_BASE_projectId,
    FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_PUBLIC_BASE_storageBucket,
    FIREBASE_MESSAGING_SENDER_ID: import.meta.env
      .VITE_PUBLIC_BASE_messagingSenderId,
    FIREBASE_APP_ID: import.meta.env.VITE_PUBLIC_BASE_appId,
    FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_PUBLIC_BASE_measurementId,
  };
}
