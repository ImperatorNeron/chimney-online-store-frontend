import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductList from "@/components/modules/products/components/ProductList";
import AddProductToCartButton from "@/components/modules/product/components/AddProductToCartButton";
import ProductSlider from "@/components/modules/product/components/ProductSlider";
import Tabs from "@/components/modules/product/components/Tabs";
import { HeartIcon, TagIcon, CreditCardIcon, ShieldCheckIcon, TruckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { productService } from "@/services/product.service";


export default async function ProductPage({
    params
}: {
    params: { slug: string };
}) {
    const { item } = await productService.fetchProduct((await params).slug);
    const hasDiscount = item.discount_percentage;
    const savings = hasDiscount ? item.price - item.discount_price : 0;

    const specifications = [
        { name: "Матеріал", value: "Алюміній" },
        { name: "Розмір", value: "25 × 35 × 5 см" },
        { name: "Вага", value: "1.2 кг" },
        { name: "Колір", value: "Сірий металік" },
        { name: "Гарантія", value: "2 роки" },
        { name: "Країна виробник", value: "Україна" }
    ];

    const paginationIn = { offset: 0, limit: 5 };
    const { items } = await productService.fetchProducts(paginationIn);

    return (
        <div className="min-h-screen bg-white">
            <div>
                <Breadcrumbs items={[
                    { title: "Головна", href: "/" },
                    { title: "Каталог", href: "/catalog" },
                    { title: item.name }
                ]} />
            </div>
            <div className="max-w-7xl mx-auto px-1 pb-6">
                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="lg:w-1/2 bg-gray-50 rounded-xl">
                        <ProductSlider />
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
                                    <span>В наявності</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                {hasDiscount ? (
                                    <>
                                        <div className="flex gap-2 mb-1">
                                            <span className="text-2xl font-bold text-red-500">{item.discount_price}₴</span>
                                            <span className="line-through text-gray-400">{item.price}₴</span>
                                        </div>
                                        <span className="inline-block bg-gray-50 text-green-600 px-2 py-1 rounded text-sm">
                                            Економія {savings}₴
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-gray-900">{item.price}₴</span>
                                )}
                            </div>

                            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                                <HeartIcon className="w-6 h-6 text-gray-600" />
                                <span className="text-sm text-gray-500">Улюблене</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="diameter" className="text-sm font-medium text-gray-700 ml-1">
                                        Діаметр:
                                    </label>
                                    <div className="relative w-[100px]">
                                        <select
                                            id="diameter"
                                            name="diameter"
                                            className="peer w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all"
                                        >
                                            <option value="20">20 мм</option>
                                            <option value="25">25 мм</option>
                                            <option value="30">30 мм</option>
                                        </select>
                                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="length" className="text-sm font-medium text-gray-700 ml-1">
                                        Довжина:
                                    </label>
                                    <div className="relative w-[100px]">
                                        <select
                                            id="length"
                                            name="length"
                                            className="peer w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all"
                                        >
                                            <option value="1">1 м</option>
                                            <option value="2">2 м</option>
                                            <option value="3">3 м</option>
                                        </select>
                                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>



                            <div className="flex gap-4">
                                <button className="flex-1 bg-gray-900 text-sm xs:text-base text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
                                    Замовити
                                </button>
                                <AddProductToCartButton productId={item.id} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                    <TruckIcon className="w-6 h-6 min-w-6 min-h-6 text-gray-800 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Швидка доставка по Україні</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Доставка за 1-3 робочих дні через Нову Пошту, Укрпошту або кур'єром. Доступний самовивоз.
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

                {/* Компонент для табів */}
                <Tabs
                    description={item.description}
                    specifications={specifications}
                />

                {/* Схожі товари */}
                <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-4 tracking-tight">
                    Схожі товари
                </h2>
                <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-3 overflow-x-auto lg:overflow-x-visible -mx-4 px-4">
                    <ProductList
                        items={items}
                        className="flex gap-2 pb-8"
                        itemClassName="flex-1 min-w-[188px]"
                    />
                </div>
            </div>
        </div>
    );
}


