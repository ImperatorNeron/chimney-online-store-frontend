import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

export default function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" mx-auto sm:px-8 px-4 py-10 max-w-screen-2xl">
            <div className="mb-16">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-200 text-sm lg:ml-8"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Повернутися до покупок
                </Link>
            </div>
            <div className='flex items-center justify-center lg:mx-8'>{children}</div>
        </div>
    );
}