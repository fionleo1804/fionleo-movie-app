import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";
import nextSettings from './next.settings';

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  customWorkerSrc: "src/worker",
  fallbacks: {
    document: "/offline.html",
  }
};

const withPWA = withPWAInit(pwaConfig);

export default withPWA(nextSettings as NextConfig);