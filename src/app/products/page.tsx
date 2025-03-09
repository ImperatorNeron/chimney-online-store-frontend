import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ItemCard from "@/components/ItemCard/ItemCard";
import ItemSlider from "@/page-components/products/ItemSlider";
import { HeartIcon, TagIcon } from "@heroicons/react/24/outline";

const ProductPage = () => {

    const products = [
        // Масив з 10 товарів (для прикладу 3, додайте решту)
        {
            id: 1,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 2,
            title: "Коліно димохідне двостінне 45° (Eco thermo AISI 201)",
            price: 699.0,
            oldPrice: 899.0,
            discount: 25,
            image: "/images/test.png",
        },
        {
            id: 3,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л ",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 4,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 5,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 699.0,
            oldPrice: 899.0,
            discount: 10,
            image: "/images/test.png",
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-1 pb-6">
                <Breadcrumbs items={[
                    { title: "Головна", href: "/" },
                    { title: "Категорія", href: "/" },
                    { title: "Труба димохідна" }
                ]} />

                {/* Основна секція */}
                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Блок з фото */}
                    <div className="lg:w-1/2 bg-gray-50 h-96 rounded-xl">
                        <ItemSlider />
                    </div>

                    {/* Інформаційна панель */}
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Труба димохідна одностінна</h1>

                        <div className="flex justify-between items-start">
                            {/* Блок з ціною */}
                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl font-bold text-red-500">1 450₴</span>
                                    <span className="text-md line-through text-gray-400">1 650₴</span>
                                </div>
                                <span className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                                    Економія 200₴
                                </span>
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
                                <button className="flex-1 border-2 border-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                                    Додати в кошик
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Опис та характеристики */}
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Опис товару</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Високоякісна одностінна димохідна труба з нержавіючої сталі.
                            Ідеальна для організації димохідних систем у приватних будинках
                            та промислових приміщеннях. Забезпечує відмінну тягу та
                            довговічність експлуатації.
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
                </div>

                {/* Схожі товари */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Схожі товари</h2>
                    <div className="flex gap-2 overflow-x-auto md:overflow-x-none px-4 -mx-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex-1 min-w-[188px] pb-10" // Додано py-2 для вертикального простору
                            >
                                <ItemCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ProductPage;