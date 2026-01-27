import withPWAInit from "@ducanh2912/next-pwa";
import type { RuntimeCaching } from "workbox-build";
import nextSettings from "./next.settings";

const runtimeCaching: RuntimeCaching[] = [
  {
    urlPattern: /^https:\/\/image\.tmdb\.org\/t\/p\/.*$/,
    handler: "CacheFirst",
    options: {
      cacheName: "tmdb-images",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^https:\/\/api\.themoviedb\.org\/3\/.*$/,
    handler: "NetworkFirst",
    options: {
      cacheName: "tmdb-api",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
];

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: false,
  fallbacks: {
    document: "/offline.html",
  },
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching,
  },
});

export default withPWA(nextSettings);