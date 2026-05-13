import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'journal.mitoflow40.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
