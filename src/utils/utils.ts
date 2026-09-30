export function joinMediaPath(...parts: Array<string | undefined | null>) {
    const base = (process.env.NEXT_PUBLIC_MEDIA_PATH ?? '').replace(/\/$/, '')
    const normalizedParts = parts
        .filter(Boolean)
        .map((part) => String(part).replace(/^\/+|\/+$/g, ''))
    return [base, ...normalizedParts].filter(Boolean).join('/')
}