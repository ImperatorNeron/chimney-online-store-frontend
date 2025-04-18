import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <div className="mb-16">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Повернутися до покупок
                </Link>
            </div>
            <div className='flex items-center justify-center'>{children}</div>
        </div>
    );
}