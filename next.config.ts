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

  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, 
      },
    ];
  },

};

export default nextConfig;
