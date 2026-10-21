import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevPocket — Developer Toolkit',
    short_name: 'DevPocket',
    description: 'Every developer tool. One pocket. Fast, free, privacy-focused utilities.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070709',
    theme_color: '#00F0FF',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
