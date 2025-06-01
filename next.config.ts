import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST || "",
        pathname: process.env.NEXT_PUBLIC_SUPABASE_PATH
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
