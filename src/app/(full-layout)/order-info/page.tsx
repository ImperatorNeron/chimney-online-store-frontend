import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { TruckIcon, EnvelopeIcon, UserIcon, MapPinIcon, CreditCardIcon, CurrencyDollarIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import ModernOption from './components/ModerOption';

export const metadata = {
    title: 'Оплата та доставка димоходів',
    description:
        'Інформація про способи оплати і доставки: Нова Пошта, Укр Пошта, самовивіз та інші. Зручні умови та швидка обробка замовлень.',
    keywords:
        'оплата, доставка, Нова Пошта, Укр Пошта, самовивіз, накладений платіж',
    openGraph: {
        title: 'Оплата та доставка',
        description:
            'Інформація про способи оплати і доставки: Нова Пошта, Укр Пошта, самовивіз та інші.',
        locale: 'uk_UA',
        type: 'website',
    },
}

export default function PaymentDeliveryPage() {
    return (
        <div>
            <Breadcrumbs items={[{ title: "Головна", href: "/" }, { title: "Доставка та оплата" }]} />
            <div className="py-12 md:py-16 lg:py-20" itemScope itemType="https://schema.org/WebPage" itemProp="mainEntityOfPage">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">Доставка та оплата</h1>
                        <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">
                            Обирайте зручний спосіб отримання та оплати замовлення
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2.5">
                                <TruckIcon className="h-6 w-6 text-gray-600" />
                                Доставка
                            </h2>
                            <div className="space-y-3">
                                <ModernOption
                                    title="Нова Пошта"
                                    icon={<MapPinIcon className="h-5 w-5 text-gray-500" />}
                                    details="1–3 робочі дні • Відстеження онлайн"
                                    price="Тариф НП"
                                />
                                <ModernOption
                                    title="Укр Пошта"
                                    icon={<EnvelopeIcon className="h-5 w-5 text-gray-500" />}
                                    details="3–7 робочих днів • До відділення"
                                    price="Тариф УП"
                                />
                                <ModernOption
                                    title="Самовивіз"
                                    icon={<UserIcon className="h-5 w-5 text-gray-500" />}
                                    details="Зі складу за попереднім узгодженням"
                                    price="Безкоштовно"
                                />
                                <ModernOption
                                    title="Доставка по області"
                                    icon={<TruckIcon className="h-5 w-5 text-gray-500" />}
                                    details="Власна доставка • Залежить від кілометражу"
                                    price="Від 300 ₴"
                                />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2.5">
                                <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />
                                Оплата
                            </h2>
                            <div className="space-y-3">
                                <ModernOption
                                    title="Оплата на карту"
                                    icon={<CreditCardIcon className="h-5 w-5 text-gray-500" />}
                                    details="Переказ на картку після підтвердження замовлення"
                                />
                                <ModernOption
                                    title="Накладений платіж"
                                    icon={<BanknotesIcon className="h-5 w-5 text-gray-500" />}
                                    details="Оплата при отриманні на пошті • Комісія перевізника"
                                />
                                <ModernOption
                                    title="Готівка при самовивозі"
                                    icon={<CurrencyDollarIcon className="h-5 w-5 text-gray-500" />}
                                    details="Оплата на місці при отриманні товару"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
