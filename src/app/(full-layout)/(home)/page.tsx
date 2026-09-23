import { productService } from "@/api/services/products.service";
import CategoriesMobileServer from "@/components/modules/categories/components/CategoriesMobileServer";
import ProductsGrid from "@/components/modules/products/components/ProductGrid";
import { serializeJsonLd } from "@/utils/jsonLd";

export const metadata = {
    title: 'Димоходи та комплектуючі від виробника',
    description:
        'Інтернет-магазин димоходів. Великий вибір димохідних систем, трійників, ревізій, переходів. Якість, гарантія, швидка доставка по всій Україні.',
    keywords:
        'димохід, купити димохід, труби для димоходу, трійники, ревізії, димохідна система, димохід з нержавійки, кріплення',
    openGraph: {
        title: 'Купити димохід від виробника | Димок',
        description:
            'Димоходи та комплектуючі за вигідними цінами. Власне виробництво. Доставка по всій Україні.',
        locale: 'uk_UA',
        type: 'website',
    },
}

export default async function Home() {
    const newItems = await productService.getNewProducts(10, 0);
    const popularItems = await productService.getPopularProducts({ offset: 0, limit: 40 });
    const discountedItems = await productService.getDiscountedProducts(15, 0);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const orgLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Димок",
        url: siteUrl,
        logo: `${siteUrl}/favicon.png`,
    };
    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Димок",
        url: siteUrl,
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/search?text={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <div className="space-y-24 mt-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(orgLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteLd) }} />
            <div className="lg:hidden">
                <CategoriesMobileServer />
            </div>
            {discountedItems?.items && discountedItems.items.length > 0 && (
                <ProductsGrid title={"Акційні товари"} items={discountedItems.items} />
            )}
            <ProductsGrid title={"Нові надходження"} items={newItems?.items} />
            <ProductsGrid title={"Найпопулярніші товари"} items={popularItems?.items} />
        </div>
    );
};
