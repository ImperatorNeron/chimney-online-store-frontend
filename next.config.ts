import type { NextConfig } from "next";

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
    const apiUrl = env("NEXT_PUBLIC_API_URL");

    const rules: { source: string; destination: string }[] = [];

    if (apiUrl) {
      rules.push({
        source: "/backend/:path*",
        destination: `${apiUrl}/:path*`,
      });
    }

    const rawMediaPath = env("NEXT_PUBLIC_MEDIA_PATH");
    const mediaUrl = env("NEXT_PUBLIC_MEDIA_URL");

    // ✅ Санитизуємо pathname так само, як у getRemotePatterns.
    //    Це прибирає "D:/gitbush/Git/media" → "/media" і додає провідний "/".
    const mediaPath = rawMediaPath ? sanitizePathname(rawMediaPath).replace(/\/\*\*$/, "") : undefined;

    const mediaIsExternal =
      !!mediaUrl &&
      !!mediaPath &&
      mediaUrl !== mediaPath &&
      /^https?:\/\//.test(mediaUrl);

    if (mediaIsExternal) {
      rules.push({
        source: `${mediaPath}/:path*`,
        destination: `${mediaUrl}/:path*`,
      });
    }

    return rules;
  },
};

/**
 * Reads an env variable and strips CR/LF + surrounding whitespace.
 * This is critical on Windows-authored `.env` files (CRLF) — without it,
 * values arrive as `"https\r"`, `"localhost\r"`, `"8080\r"`, etc., which
 * blows up `new URL()` with `ERR_INVALID_URL`.
 */
function env(name: string): string | undefined {
  const raw = process.env[name];
  if (raw == null) return undefined;
  const cleaned = raw.replace(/[\r\n]+/g, "").trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Converts a possibly messy `NEXT_PUBLIC_MEDIA_PATH` into a valid URL pathname.
 * - `\` → `/`
 * - Local Windows paths like `D:/gitbush/Git/media` are reduced to `/media`
 *   (their last segment), since the drive-letter prefix is meaningless in a URL.
 * - Ensures a leading `/` and a trailing `/**` wildcard.
 */
function sanitizePathname(raw: string): string {
  let p = raw.replace(/\\/g, "/").trim();

  // Strip a Windows drive prefix (e.g. "D:/gitbush/Git/media" → "/media").
  if (/^[A-Za-z]:\//.test(p)) {
    const parts = p.split("/").filter(Boolean);
    p = "/" + (parts[parts.length - 1] || "media");
  }

  if (!p.startsWith("/")) p = "/" + p;
  if (!p.endsWith("/**")) p = p.replace(/\/+$/, "") + "/**";
  return p;
}

/**
 * Builds the list of allowed remote image patterns for next/image.
 *
 * Next.js >= 15.3.0 requires every entry in `images.remotePatterns`
 * to be an instance of the global `URL` class (the old object shape
 * `{ protocol, hostname, port, pathname }` is no longer accepted).
 */
function getRemotePatterns(): URL[] {
  const host = env("NEXT_PUBLIC_MEDIA_HOST");
  const rawPath = env("NEXT_PUBLIC_MEDIA_PATH");
  const port = env("NEXT_PUBLIC_MEDIA_PORT");
  const schema = env("NEXT_PUBLIC_MEDIA_SCHEMA");

  if (!host || !rawPath || !schema) {
    console.error(
      "Error: Missing NEXT_PUBLIC_MEDIA_HOST / NEXT_PUBLIC_MEDIA_PATH / NEXT_PUBLIC_MEDIA_SCHEMA environment variables",
    );
    return [];
  }

  if (schema !== "http" && schema !== "https") {
    console.error(
      `Error: NEXT_PUBLIC_MEDIA_SCHEMA must be "http" or "https" (got "${schema}")`,
    );
    return [];
  }

  const pathname = sanitizePathname(rawPath);
  const portPart = port ? `:${port}` : "";
  const href = `${schema}://${host}${portPart}${pathname}`;

  try {
    return [new URL(href)];
  } catch (err) {
    console.error(`Error: Failed to build remote image pattern from "${href}"`, err);
    return [];
  }
}

export default nextConfig;