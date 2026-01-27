import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FionLeo Movie App',
    short_name: 'FionLeo',
    description: 'Listed all movies and book your favourite movie',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      { 
        src: '/images/icons/icon-192x192.png', 
        sizes: '192x192', 
        type: 'image/png',
        purpose: 'maskable'
      },
      { 
        src: '/images/icons/icon-512x512.png', 
        sizes: '512x512', 
        type: 'image/png' 
      },
    ],
  };
}