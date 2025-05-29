import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata = {
    title: 'Сторінку не знайдено',
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto flex items-center justify-center h-36 w-36 rounded-full bg-gray-100">
                    <svg
                        className="h-24 w-24 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h1 className="mt-6 text-4xl font-bold text-black">404</h1>
                <p className="mt-2 text-xl text-gray-600">Сторінку не знайдено</p>
                <p className="mt-4 text-gray-500">
                    На жаль, ми не можемо знайти сторінку, яку ви шукаєте.
                </p>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md border border-black bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-50 focus:outline-none"
                    >
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Повернутися на головну
                    </Link>
                </div>
            </div>
        </div>
    );
}