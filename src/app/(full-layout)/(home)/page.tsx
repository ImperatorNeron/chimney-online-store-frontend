import { productService } from "@/api/services/products.service";
import CategoriesMobileServer from "@/components/modules/categories/components/CategoriesMobileServer";
import ProductsGrid from "@/components/modules/products/components/ProductGrid";

export const revalidate = 600;
export const metadata = {
    title: 'Димоходи | Купити димохід та комплектуючі з доставкою по Україні',
    description:
        'Інтернет-магазин димоходів. Великий вибір димохідних систем, трійників, ревізій, переходів. Якість, гарантія, швидка доставка по всій Україні.',
    keywords:
        'димохід, купити димохід, труби для димоходу, трійники, ревізії, димохідна система, димохід з нержавійки, кріплення',
    openGraph: {
        title: 'Купити димохід від виробника | Інтернет-магазин димоходів',
        description:
            'Димоходи та комплектуючі за вигідними цінами. Власне виробництво. Доставка по всій Україні.',
        url: '',
        siteName: '',
        locale: 'uk_UA',
        type: 'website',
    },
}

export default async function Home() {
    const newItems = await productService.getNewProducts(10, 0);
    const popularItems = await productService.getPopularProducts({ offset: 0, limit: 40 });
    const discountedItems = await productService.getDiscountedProducts(15, 0);

    return (
        <div className="space-y-24 mt-8">
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
