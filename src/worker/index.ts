/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      if (!event.data) return;

      try {
        const data = event.data.json();
        const title = data.title || "New Alert";
        const options = {
          body: data.body || data.message || "No content provided",
          icon: "/images/pwa/manifest-icon-192.maskable.png",
          badge: "/images/pwa/badge.png",
          vibrate: [100, 50, 100],
          data: {
            url: data.url || "/",
          },
          requireInteraction: true,
          silent: false,
        };

        await self.registration.showNotification(title, options);
      } catch (error) {
        // To keep for debugging if needed
      }
    })()
  );
});

export {};