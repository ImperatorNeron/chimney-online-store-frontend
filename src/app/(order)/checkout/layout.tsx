import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-lg text-gray-800 hover:underline hover:text-black transition-colors">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Повернутися до покупок
                    </Link>

                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
                    Оформлення замовлення
                </h1>
                <div className="flex flex-col lg:flex-row gap-2 sm:gap-8">{children}</div>
            </div>
        </div>
    );
}