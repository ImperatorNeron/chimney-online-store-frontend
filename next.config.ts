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
    const rules = [
      {
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];

    // Media rewrite is only needed when media is served from an EXTERNAL origin
    // (e.g. Supabase CDN). With the S3/Railway backend, media is served by our
    // own /media/* route (nginx proxies it to the backend), so we must NOT
    // rewrite it to an external URL — and self-rewriting would loop. Skip the
    // rule when MEDIA_URL is unset or points back at MEDIA_PATH ("/media").
    const mediaPath = process.env.NEXT_PUBLIC_MEDIA_PATH;
    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
    const mediaIsExternal =
      !!mediaUrl && !!mediaPath && mediaUrl !== mediaPath && /^https?:\/\//.test(mediaUrl);

    if (mediaIsExternal) {
      rules.push({
        source: `${mediaPath}/:path*`,
        destination: `${mediaUrl}/:path*`,
      });
    }

    return rules;
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
