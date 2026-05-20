import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'journal.mitoflow40.com',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'm.media-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'thumbnail.image.rakuten.co.jp', pathname: '/**' },
      { protocol: 'https', hostname: 'shop.r10s.jp', pathname: '/**' },
      { protocol: 'https', hostname: 'image.rakuten.co.jp', pathname: '/**' },
    ],
  },
};

export default nextConfig;
