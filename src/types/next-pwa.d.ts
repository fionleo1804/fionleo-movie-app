declare module '@ducanh2912/next-pwa' {
  import { NextConfig } from 'next';
  import { GenerateSWConfig } from 'workbox-build';

  export interface PluginOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    customWorkerSrc?: string;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    workboxOptions?: GenerateSWConfig;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
  }

  function withPWAInit(
    pluginOptions?: PluginOptions
  ): (nextConfig: NextConfig) => NextConfig;

  export default withPWAInit;
}

interface Window {
  Workbox: object; 
}