import { catalogService } from "@/api/services/catalog.services";
import { categoryService } from "@/api/services/category.service";
import { productService } from "@/api/services/products.service";
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock";
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton";
import ChildCategories, { type ChildCategoryItem } from "@/components/modules/catalog/components/ChildCategories";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import ActiveFilters from "@/components/modules/catalog/components/ActiveFilters";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CatalogResults from "@/components/modules/catalog/components/CatalogResults";

type Params = Promise<{ slug: string[] }>;

type CatalogSearchParams = Promise<{
    page?: string;
    limit?: string;
    field?: string;
    ordering?: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;

    const rawCategoryNames = await categoryService.getCategoriesBySlugs(slug);
    const categoryNames = Array.isArray(rawCategoryNames) ? (rawCategoryNames as [string, string][]) : [];

    const lastCategory = categoryNames[categoryNames.length - 1];
    const title = lastCategory ? `Каталог - ${lastCategory[0]}` : "Каталог";

    return {
        title,
        description: `Огляд категорії ${lastCategory ? lastCategory[0] : "каталог"} - знайдіть товари, що вас цікавлять.`,
        openGraph: {
            title,
            description: `Огляд категорії ${lastCategory ? lastCategory[0] : "каталог"}`,
            url: `.../${slug.join("/")}`,
            siteName: "",
            locale: "uk_UA",
            type: "website",
        },
    };
}

export default async function CatalogPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams?: CatalogSearchParams;
}) {
    const { slug } = await params;
    const lastSlug = slug.at(-1);

    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!,
        lastSlug,
    ) as { items: unknown[]; currentPage: number; totalPages: number; limit: number };

    const rawFilters = await productService.getFilters(searchParams!, lastSlug);
    const filters = rawFilters
        ? {
            ...rawFilters,
            min_price:
                rawFilters.min_price !== null && rawFilters.min_price !== undefined
                    ? Number(rawFilters.min_price)
                    : null,
            max_price:
                rawFilters.max_price !== null && rawFilters.max_price !== undefined
                    ? Number(rawFilters.max_price)
                    : null,
        }
        : undefined;

    const rawCategoryNames = await categoryService.getCategoriesBySlugs(slug);
    const categoryNames: [string, string][] = Array.isArray(rawCategoryNames) ? (rawCategoryNames as [string, string][]) : [];

    const breadcrumbsFromCategories = categoryNames.slice(0, -1).map(([name, slugItem]: [string, string]) => ({
        title: name,
        href: `/catalog/${slugItem}`,
    }));

    const lastCategory = categoryNames[categoryNames.length - 1];
    if (lastCategory) {
        breadcrumbsFromCategories.push({
            title: lastCategory[0],
            href: "",
        });
    }

    const breadcrumbItems = [{ title: "Головна", href: "/" }, ...breadcrumbsFromCategories];

    let childCategories: ChildCategoryItem[] = [];
    try {
        if (lastSlug) {
            const rawCategories = await categoryService.getCategories();
            const categories = (Array.isArray(rawCategories) ? rawCategories : []) as Array<{
                id: number;
                slug: string;
            }>;

            const currentCategory = categories.find((c) => c.slug === lastSlug);
            if (currentCategory?.id) {
                const rawChildCategories = await categoryService.getChildCategories([currentCategory.id]);
                childCategories = Array.isArray(rawChildCategories)
                    ? (rawChildCategories as ChildCategoryItem[])
                    : [];
            }
        }
    } catch {
        childCategories = [];
    }

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />

            <div className="flex gap-4 mt-5 items-start" itemScope itemType="https://schema.org/CollectionPage">
                <DesktopFilterBlock filters={filters} />
                <MobileFilterButton filters={filters} />
                <div className="w-full lg:w-3/4">
                    {childCategories.length && lastSlug ? (
                        <div className="mb-4">
                            <ChildCategories mainCategorySlug={lastSlug} categories={childCategories} />
                        </div>
                    ) : null}

                    <div className="flex gap-3 mb-4">
                        <LimitSelector />
                        <OrderSelector />
                    </div>

                    <ActiveFilters />

                    <CatalogResults items={items as any[]} limit={limit} currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </>
    );
}
