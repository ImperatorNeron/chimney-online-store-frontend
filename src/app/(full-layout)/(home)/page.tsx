import { productService } from "@/api/services/products.service";
import CategoriesDesktopServer from "@/components/modules/categories/components/CategoriesDesktopServer";
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
        url: '', // замінити на домен
        siteName: '', // замінити на домен
        locale: 'uk_UA',
        type: 'website',
    },
}

export default async function Home() {
    const newItems = await productService.getProducts({ offset: 0, limit: 10 });
    const popularItems = await productService.getPopularProducts({ offset: 0, limit: 10 });

    return (
        <div className="space-y-24 mt-8">
            <div className="lg:hidden">
                <CategoriesMobileServer />
            </div>
            <ProductsGrid title={"Найпопулярніші товари"} items={popularItems?.items}/>
            <ProductsGrid title={"Нові надходження"} items={newItems?.items} />
        </div>
    );
};
