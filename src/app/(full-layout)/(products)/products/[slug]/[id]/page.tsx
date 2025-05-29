import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductList from "@/components/modules/products/components/ProductList";
import AddProductToCartButton from "@/components/modules/product/components/AddProductToCartButton";
import ProductSlider from "@/components/modules/product/components/ProductSlider";
import Tabs from "@/components/modules/product/components/Tabs";
import { TagIcon, CreditCardIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline'
import { productService } from "@/api/services/products.service";
import LikeButton from "@/components/modules/product/components/LikeButton";
import Selectors from "./selectors";
import NotFound from "@/app/not-found";

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string, id: number }>;
}) {
    const productSlug = (await params).slug;
    const productId = (await params).id;

    try {
        const fullItem = await productService.getFullProduct(productSlug);
        const variation = fullItem?.variations?.find(v => v.id == productId);

        if (!variation || !fullItem) {
            return {
                title: "Товар не знайдено | Магазин димоходів",
                description: "На жаль, цей товар більше не доступний. Перегляньте інші димохідні системи в нашому каталозі."
            };
        }

        const productName = fullItem.name;
        const categoryNames = fullItem.categories?.map(c => c[0]).join(", ") || "";
        const price = variation.discount_price ?? variation.price;
        const description = `Купити ${productName} за ${price}₴. ${variation.diameter ? `Діаметр: ${variation.diameter} мм. ` : ''}${variation.length ? `Довжина: ${variation.length} см. ` : ''}Гарантія якості, швидка доставка по Україні.`;

        return {
            title: `${productName} - купити в інтернет-магазині | Магазин димоходів`,
            description: description,
            keywords: [
                productName,
                "димохід",
                "купити димохід",
                "комплектуючі для димоходу",
                ...(categoryNames ? categoryNames.split(", ") : []),
                ...(variation.metal_type ? [variation.metal_type] : []),
                ...(variation.diameter ? [`димохід ${variation.diameter} мм`] : [])
            ],
            openGraph: {
                title: `${productName} | Магазин димоходів`,
                description: description,
                url: ``,
                type: 'website',
            },
        };
    } catch {
        return {
            title: "Товар | Магазин димоходів",
            description: "Якісні димохідні системи та комплектуючі. Великий вибір, гарантія якості, професійна консультація."
        };
    }
}

export default async function ProductPage({
    params
}: {
    params: Promise<{ slug: string, id: number }>;
}) {
    const productSlug = (await params).slug
    let fullItem;
    try {
        fullItem = await productService.getFullProduct(productSlug)
    } catch {
        return <NotFound />;
    }
    const productId = (await params).id
    const variation = fullItem?.variations?.find(v => v.id == productId);
    if (!variation) return <NotFound />;

    const result = {
        name: fullItem?.name,
        slug: fullItem?.slug,
        description: fullItem?.description,
        price: variation?.price,
        extra_attrs: null,
        category_id: fullItem?.category_id,
        id: variation?.id,
        created_at: variation?.created_at,
        updated_at: variation?.updated_at,
        discount_price: variation?.discount_price,
        discount_percentage: variation?.discount_percentage,
        diameter: variation?.diameter,
        length: variation?.length,
        thickness: variation?.thickness,
        angle: variation?.angle,
        metal_type: variation?.metal_type,
        images: fullItem?.images,
        categories: fullItem?.categories,
    };

    const item = result;
    const hasDiscount = item.discount_percentage;
    const savings = hasDiscount ? (item.price ?? 0) - (item.discount_price ?? 0) : 0;

    const specifications = [
        { name: 'Код товару', value: item.id !== undefined ? item.id.toString() : "" },
        { name: 'Найменування', value: item.name },
        item.diameter && { name: "Діаметр", value: item.diameter.toString() },
        item.length && { name: "Довжина", value: item.length.toString() },
        item.thickness && { name: "Товщина", value: item.thickness.toString() },
        item.angle && { name: "Кут", value: item.angle.toString() },
        item.metal_type && { name: "Метал", value: item.metal_type },
    ].filter((spec): spec is { name: string; value: string } => !!spec);

    const paginationIn = { offset: 0, limit: 5 };
    const items = await productService.getProducts(paginationIn);
    return (
        <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/Product">
            <meta itemProp="brand" content="Ваш бренд" />
            <meta itemProp="mpn" content={item.id?.toString() || ""} />
            <meta itemProp="sku" content={item.id?.toString() || ""} />
            <link itemProp="url" href={`/${item.slug}/${item.id}`} />
            <div>
                <Breadcrumbs
                    items={[
                        { title: "Головна", href: "/" },
                        ...(item.categories?.slice().reverse().reduce(
                            (acc: { title: string; href: string }[], [name, slug]) => {
                                const previousPath = acc.length > 0 ? acc[acc.length - 1].href : "/catalog";
                                acc.push({
                                    title: name ?? "",
                                    href: `${previousPath}/${slug}`,
                                });
                                return acc;
                            },
                            [] as { title: string; href: string }[]
                        ) || []),
                        { title: item.name ?? "" },
                    ]}
                />
            </div>
            <div className="max-w-7xl mx-auto px-1 pb-6">
                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="lg:w-1/2 bg-gray-50 rounded-xl" itemProp="image" itemScope itemType="https://schema.org/ImageGallery">
                        <ProductSlider images={item.images ?? []} />
                    </div>

                    <div className="lg:w-1/2 space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                {item.name}
                            </h1>
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500 text-bold">Код товару: {item.id}</p>
                                <div className="flex items-center gap-2 text-sm text-green-500">
                                    <TagIcon className="w-5 h-5 text-green-500" />
                                    <span itemProp="availability" itemType="https://schema.org/InStock">В наявності</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                <meta itemProp="priceCurrency" content="UAH" />
                                <meta itemProp="availability" content="https://schema.org/InStock" />
                                <link itemProp="url" href={`${item.slug}/${item.id}`} />
                                <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
                                {hasDiscount ? (
                                    <>
                                        <div className="flex gap-2 mb-1">
                                            <span className="text-2xl font-bold text-red-500" itemProp="price">{item.discount_price}₴</span>
                                            <span className="line-through text-gray-400">{item.price}₴</span>
                                        </div>
                                        <span className="inline-block bg-gray-50 text-green-600 px-2 py-1 rounded text-sm">
                                            Економія {savings}₴
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-gray-900" itemProp="price">{item.price}₴</span>
                                )}
                            </div>

                            {item.id !== undefined && <LikeButton productId={item.id} />}
                        </div>

                        <div className="space-y-4">
                            <Selectors fullItem={fullItem} variation={variation} slug={productSlug} />

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button className="px-14 bg-gray-900 text-sm xs:text-base text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition" aria-label={`Замовити ${item.name}`}>
                                    Замовити
                                </button>
                                {item.id !== undefined && (
                                    <AddProductToCartButton productId={item.id} />
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                    <TruckIcon className="w-6 h-6 min-w-6 min-h-6 text-gray-800 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Швидка доставка по Україні</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Доставка за 1-3 робочих дні через Нову Пошту, Укрпошту або кур&apos;єром. Доступний самовивоз.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CreditCardIcon className="w-6 h-6 min-w-6 min-h-6 text-gray-800 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Гнучкі способи оплати</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Оплата онлайн LiqPay, готівкою при отриманні або оплата на карту.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ShieldCheckIcon className="w-6 h-6 min-w-6 min-h-6 text-gray-800 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Гарантія та сервіс</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            24-місячна офіційна гарантія, повернення товару протягом 14 днів.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs
                    description={item.description || ""}
                    specifications={specifications}
                />

                <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-4 tracking-tight">
                    Схожі товари
                </h2>
                <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-3 overflow-x-auto lg:overflow-x-visible -mx-4 px-4">
                    <ProductList
                        items={items?.items}
                        className="flex gap-2 pb-8"
                        itemClassName="flex-1 min-w-[188px]"
                    />
                </div>
            </div>
        </div>
    );
}


