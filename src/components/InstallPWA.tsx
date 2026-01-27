"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BeforeInstallPromptEvent } from "@/types/pwa";

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const isMobileSafari = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
      const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;

      setIsIOS(isMobileSafari);
      setIsStandalone(isInStandaloneMode);
    });

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    setInstallPrompt(null);
  };

  if (isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {installPrompt && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl transition-all scale-100 hover:scale-105"
        >
          <Image 
            src="/images/icons/download.svg" 
            width={24} 
            height={24} 
            className="inline-block" 
            alt="Download APp" 
            />
            Download App
        </button>
      )}

      {isIOS && !installPrompt && (
        <div className="bg-white text-black p-4 rounded-lg shadow-2xl border border-gray-200 max-w-[250px] animate-bounce">
          <p className="text-sm font-medium">
            For IOS: Tap &quot;Share&quot; and select &quot;Add to Home Screen&quot;.
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200"></div>
        </div>
      )}
    </div>
  );
}