import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CardsBlock from "@/components/CardsBlock/CardsBlock";
import AddToCartButton from "@/page-components/products/ButtonAddToCart";
import ItemSlider from "@/page-components/products/ItemSlider";
import { fetchProduct, fetchProducts } from "@/services/productService"
import { HeartIcon, TagIcon } from "@heroicons/react/24/outline";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const { item } = await fetchProduct(slug)
    const hasDiscount = item.discount_percentage;
    const savings = hasDiscount ? item.price - item.discount_price : 0;

    const paginationIn: PaginationIn = { offset: 0, limit: 5 }
    const { items } = await fetchProducts(paginationIn);

    return (
        <div className="min-h-screen bg-white">
            <div className="">
                <Breadcrumbs items={[
                    { title: "Головна", href: "/" },
                    { title: "Каталог", href: "/catalog" },
                    { title: item.name }
                ]} />
            </div>
            <div className="max-w-7xl mx-auto px-1 pb-6">
                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="lg:w-1/2 bg-gray-50 h-96 rounded-xl">
                        <ItemSlider />
                    </div>
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{item.name}</h1>
                        <div className="flex justify-between items-start">
                            <div>
                                {hasDiscount ? (
                                    <>
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-2xl font-bold text-red-500">{item.discount_price}₴</span>
                                            <span className="text-md line-through text-gray-400">{item.price}₴</span>
                                        </div>
                                        <span className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                                            Економія {savings}₴
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-gray-900">{item.price}₴</span>
                                )}
                            </div>

                            {/* Кнопка "Улюблене" */}
                            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                                <HeartIcon className="w-6 h-6 text-red-600" />
                                <span className="text-sm text-gray-500 hidden sm:block">Улюблене</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Наявність */}
                            <div className="flex items-center gap-2">
                                <TagIcon className="w-5 h-5 text-green-500" />
                                <span className="text-green-500">В наявності</span>
                            </div>

                            {/* Кнопки дій */}
                            <div className="flex gap-4">
                                <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                                    Купити зараз
                                </button>
                                <AddToCartButton productId={item.id} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Опис та характеристики */}
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Опис товару</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Характеристики</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Матеріал</span>
                                <span className="text-gray-900">Нержавіюча сталь AISI 304</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Діаметр</span>
                                <span className="text-gray-900">120 мм</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Довжина</span>
                                <span className="text-gray-900">1 м</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4 md:mt-16 tracking-tight">Схожі товари</h2>
                    <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-3 overflow-x-auto lg:overflow-x-visible-mx-4 -mx-4 px-4">
                        <CardsBlock items={items} className="flex gap-2 pb-8" itemClassName="flex-1 min-w-[188px]" />
                    </div>

                </div>
            </div>
        </div>
    );
};