"use client";

import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setIsSubscribed(!!sub);
        });
      });
    } else {
      setIsSupported(false);
    }
  }, []);

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      
      if (permission !== "granted") {
        return alert("Notifications are blocked in your browser settings.");
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        return;
      }
      
      const convertedVapidKey = urlBase64ToUint8Array(vapidKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      if (subscription) {
        setIsSubscribed(true);
      }
    } catch (err) {
      // Error handled silently for production
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={subscribeUser}
        disabled={isSubscribed}
        className={`px-4 py-2 rounded shadow-lg transition-colors ${
          isSubscribed 
            ? "bg-gray-500 cursor-default" 
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        } text-white font-medium`}
      >
        {isSubscribed ? "Notifications Active" : "Enable Movie Alerts"}
      </button>
    </div>
  );
}