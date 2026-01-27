"use client";

import { useEffect } from "react";

export default function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // console.log("Service Worker ready with scope:", registration.scope);
      }).catch((error: unknown) => {
        if (error instanceof Error) {
          // console.error("Service Worker registration failed:", error.message);
        }
      });
    }
  }, []);

  return <>{children}</>;
}