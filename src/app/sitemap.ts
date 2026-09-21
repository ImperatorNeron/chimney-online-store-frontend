import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const dynamic = 'force-dynamic';

async function fetchProducts(): Promise<{ slug: string; id: number }[]> {
    try {
        const res = await fetch(`${API_URL}/products?offset=0&limit=1000`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.items?.map((p: any) => ({ slug: p.slug, id: p.id })) || [];
    } catch {
        return [];
    }
}

async function fetchCategories(): Promise<{ slug: string; parent_id: number | null }[]> {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

function buildCategoryPath(
    cat: { slug: string; parent_id: number | null; id: number },
    allCats: { slug: string; parent_id: number | null; id: number }[],
): string {
    const parts: string[] = [];
    let current: typeof cat | undefined = cat;
    while (current) {
        parts.unshift(current.slug);
        current = current.parent_id ? allCats.find(c => c.id === current!.parent_id) : undefined;
    }
    return parts.join('/');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
        { url: `${SITE_URL}/contacts`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE_URL}/order-info`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.4 },
    ];

    const catsWithId = categories as { slug: string; parent_id: number | null; id: number }[];
    const categoryPages: MetadataRoute.Sitemap = catsWithId.map(cat => ({
        url: `${SITE_URL}/catalog/${buildCategoryPath(cat, catsWithId)}`,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const productPages: MetadataRoute.Sitemap = products.map(p => ({
        url: `${SITE_URL}/products/${p.slug}/${p.id}`,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...productPages];
}
