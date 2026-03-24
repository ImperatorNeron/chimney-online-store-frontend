import { catalogService } from "@/api/services/catalog.services";
import { productService } from "@/api/services/products.service";
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton";
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CatalogResults from "@/components/modules/catalog/components/CatalogResults";

export const metadata = {
    title: 'Пошук в каталозі',
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

export default async function SearchPage({ searchParams }: {
    searchParams?: Promise<{ text: string, page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!
    );

    const rawFilters = await productService.getFilters(searchParams!);
    const filters = rawFilters
        ? {
            ...rawFilters,
            min_price: rawFilters.min_price !== null && rawFilters.min_price !== undefined ? Number(rawFilters.min_price) : null,
            max_price: rawFilters.max_price !== null && rawFilters.max_price !== undefined ? Number(rawFilters.max_price) : null,
        }
        : rawFilters;
    const breadcrumbItems = [
        { title: "Головна", href: "/" },
        { title: "Пошук" },
    ];
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex gap-4 mt-5 min-h-[500px]">
                <DesktopFilterBlock filters={filters} />
                <MobileFilterButton filters={filters} />
                <div className="w-full lg:w-3/4">
                    <div className="flex gap-3 mb-4">
                        <LimitSelector />
                        <OrderSelector />
                    </div>

                    <CatalogResults items={items as any[]} limit={limit} currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </>
    );
};
