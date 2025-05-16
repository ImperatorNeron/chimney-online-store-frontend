import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_BACKEND_HOST || "localhost",
        port: process.env.NEXT_PUBLIC_BACKEND_PORT,
        pathname: '/uploads/**',
      },

    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
