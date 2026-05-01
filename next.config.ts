import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: getRemotePatterns(),
    unoptimized: true,
  },
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: `${process.env.NEXT_PUBLIC_MEDIA_PATH}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_MEDIA_URL}/:path*`,
      },
    ];
  },

};

function getRemotePatterns(): RemotePattern[] {
  const host = process.env.NEXT_PUBLIC_MEDIA_HOST;
  const pathname = process.env.NEXT_PUBLIC_MEDIA_PATH
  const port = process.env.NEXT_PUBLIC_MEDIA_PORT
  const schema = process.env.NEXT_PUBLIC_MEDIA_SCHEMA

  if (!host || !pathname || !schema) {
    console.error('Error: Missing environment variables');
    return [];
  }

  const pattern: RemotePattern = {
    protocol: schema as "http" | "https",
    hostname: `${host}/**`,
    pathname: pathname,
  };

  if (port) {
    pattern.port = port;
  }

  return [pattern];
}

export default nextConfig;
