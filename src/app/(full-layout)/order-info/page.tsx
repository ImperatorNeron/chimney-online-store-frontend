import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { TruckIcon, EnvelopeIcon, UserIcon, MapPinIcon, CreditCardIcon, CurrencyDollarIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import ModernOption from './components/ModerOption';

export const metadata = {
    title: 'Оплата та доставка',
    description:
        'Інформація про способи оплати і доставки: Нова Пошта, Укр Пошта, самовивіз та інші. Зручні умови та швидка обробка замовлень.',
    keywords:
        'оплата, доставка, Нова Пошта, Укр Пошта, самовивіз, LiqPay, накладений платіж, ПриватБанк, Monobank',
    openGraph: {
        title: 'Оплата та доставка',
        description:
            'Інформація про способи оплати і доставки: Нова Пошта, Укр Пошта, самовивіз та інші. Зручні умови та швидка обробка замовлень.',
        url: '', // замінити на домен
        siteName: '', // замінити на домен
        locale: 'uk_UA',
        type: 'website',
    },
}

export default function PaymentDeliveryPage() {
    return (
        <div>
            <Breadcrumbs items={[{ title: "Головна", href: "/" }, { title: "Доставка та оплата" }]} />
            <div className="py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28" itemScope itemType="https://schema.org/WebPage" itemProp="mainEntityOfPage">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24">
                        <h1 className="text-4xl font-medium text-gray-900 tracking-tight">Оплата & Доставка</h1>
                        <div className="mt-6">
                            <div className="inline-flex items-center text-gray-600 space-x-4">
                                <span className="font-medium px-4">Графік роботи: Пн-Пт 9:00-18:00, Сб 10:00-15:00</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <section className="space-y-6">
                            <div className="">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center space-x-3">
                                    <TruckIcon className="h-7 w-7 text-gray-600" />
                                    <span>Доставка</span>
                                </h2>
                                <div className="space-y-3">
                                    <ModernOption
                                        title="Нова Пошта"
                                        icon={<MapPinIcon className="h-5 w-5 text-blue-600" />}
                                        details="1-2 дні • Відстеження онлайн"
                                        price="Від 50₴"
                                    />
                                    <ModernOption
                                        title="Укр Пошта"
                                        icon={<EnvelopeIcon className="h-5 w-5 text-green-600" />}
                                        details="3-5 днів • До відділення"
                                        price="Від 40₴"
                                    />
                                    <ModernOption
                                        title="Самовивіз"
                                        icon={<UserIcon className="h-5 w-5 text-purple-600" />}
                                        details="вул. Центральна 15, Луцьк"
                                        price="Безкоштовно"
                                    />
                                    <ModernOption
                                        title="По Волині"
                                        icon={<TruckIcon className="h-5 w-5 text-orange-600" />}
                                        details="До 24 годин • Кур'єр"
                                        price="Фіксовано 80₴"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center space-x-3">
                                <CurrencyDollarIcon className="h-7 w-7 text-gray-600" />
                                <span>Оплата</span>
                            </h2>
                            <div className="space-y-3">
                                <ModernOption
                                    title="LiqPay Online"
                                    icon={<CreditCardIcon className="h-5 w-5 text-indigo-600" />}
                                    details="VISA/Mastercard • Миттєво"
                                />
                                <ModernOption
                                    title="Накладений платіж"
                                    icon={<DevicePhoneMobileIcon className="h-5 w-5 text-rose-600" />}
                                    details="+2% комісія • Нова Пошта"
                                />
                                <ModernOption
                                    title="Переказ на карту"
                                    icon={<CurrencyDollarIcon className="h-5 w-5 text-emerald-600" />}
                                    details="ПриватБанк / Monobank"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    )
}
