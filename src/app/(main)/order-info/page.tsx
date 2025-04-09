import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Image from "next/image";

export default function OrderInfoPage() {
    return (
        <div className="bg-white">
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Оплата та доставка" }
            ]} />
            <div className="container mx-auto py-12">
                <div className="grid lg:grid-cols-2 gap-12 mb-5 lg:mb-20">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-3xl font-bold text-black mb-8 text-center lg:text-start">Варіанти доставки</h2>
                            <div className="grid gap-6">
                                <div className="p-6 group bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                                    <h3 className="text-xl font-semibold text-black mb-2 flex items-center">
                                        <span className="w-3 h-3 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-600 transition-colors"></span>
                                        Нова Пошта
                                    </h3>
                                    <ul className="list-disc pl-8 space-y-2 text-gray-600">
                                        <li>Термін доставки: 1-3 дні</li>
                                        <li>Можливість адресної доставки</li>
                                    </ul>
                                </div>
                                <div className="p-6 group bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                                    <h3 className="text-xl font-semibold text-black mb-2 flex items-center">
                                        <span className="w-3 h-3 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-600 transition-colors"></span>
                                        Укрпошта та ін.
                                    </h3>
                                    <ul className="list-disc pl-8 space-y-2 text-gray-600">
                                        <li>Термін доставки: 2-5 дні</li>
                                        <li>Можливість адресної доставки</li>
                                    </ul>
                                </div>
                                <div className="p-6 group bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                                    <h3 className="text-xl font-semibold text-black mb-2 flex items-center">
                                        <span className="w-3 h-3 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-600 transition-colors"></span>
                                        Самовивіз (Волинь)
                                    </h3>
                                    <ul className="list-disc pl-8 space-y-2 text-gray-600">
                                        <li>Наш пункт видачі у Волині</li>
                                        <li>Безкоштовно</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold text-black mb-6 text-center lg:text-start">Тарифи доставки</h2>
                            <div className="bg-gray-100 py-6 px-3 lg:p-6 group rounded-md shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-200">
                                        <span className="text-gray-600">Замовлення від 1500 грн</span>
                                        <span className="font-semibold text-black">Безкоштовно</span>
                                    </li>
                                    <li className="flex justify-between items-center py-3 px-3 bg-white rounded-lg border border-gray-200">
                                        <span className="text-gray-600">Замовлення до 1500 грн</span>
                                        <span className="font-semibold text-black">Від 50 грн</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-3xl font-bold text-black mb-8 text-center lg:text-start">Способи оплати</h2>
                            <div className="space-y-10">
                                <section>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 flex flex-col items-center text-center group">
                                            <div className="mb-4 transition-transform group-hover:scale-110">
                                                <Image
                                                    src="/icons/online-payment.png"
                                                    alt="Оплата онлайн"
                                                    width={64}
                                                    height={64}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-black mb-2">Оплата онлайн</h3>
                                            <p className="text-sm text-gray-600">Реквізити надасть менеджер</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 flex flex-col items-center text-center group">
                                            <div className="mb-4 transition-transform group-hover:scale-110">
                                                <Image
                                                    src="/icons/cash-on-delivery.png"
                                                    alt="Накладений платіж"
                                                    width={64}
                                                    height={64}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-black mb-2">Накладений платіж</h3>
                                            <p className="text-sm text-gray-600">Оплата при отриманні</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                        <section>
                            <div className="bg-gray-100 py-8 px-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                                <h3 className="text-xl font-semibold text-black mb-6">Графік роботи</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center py-2.5 px-3 bg-white rounded-lg border border-gray-200">
                                        <span className="text-black">Понеділок - П'ятниця</span>
                                        <span className="font-medium text-black">09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between items-center py-2.5 px-3 bg-white rounded-lg border bg-gray-100 ">
                                        <span className="text-black">Субота</span>
                                        <span className="font-medium text-black">Вихідний</span>
                                    </li>
                                    <li className="flex justify-between items-center py-2.5 px-3 bg-white rounded-lg border bg-gray-100 ">
                                        <span className="text-black">Неділя</span>
                                        <span className="font-medium text-black">Вихідний</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
