import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'journal.mitoflow40.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
