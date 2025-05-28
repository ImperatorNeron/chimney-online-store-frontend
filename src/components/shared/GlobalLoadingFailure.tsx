'use client';

import { useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function GlobalLoadingFailure({ error }: { error: Error }) {
    useEffect(() => {
        console.error(`${error}`);
    }, [error]);

    return (
        <div className="min-h-[600px] flex flex-1 flex-col items-center justify-center align-center bg-white px-4 my-16">
            <div className="max-w-md text-center">
                <div className="animate-pulse mb-8">
                    <svg
                        className="mx-auto h-24 w-24 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                    </svg>
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Ой! Щось пішло не так
                </h1>

                <p className="mt-4 text-lg leading-7 text-gray-600">
                    Ми зіткнулися з несподіваною помилкою. Не хвилюйтеся - це не ваша вина.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 bg-gray-900 hover:bg-gray-800"
                >
                    <ArrowPathIcon className="mr-2 h-4 w-4" />
                    Перезавантажити сторінку
                </button>

                <p className="mt-8 text-xs text-gray-500">
                    Якщо проблема зберігається, зверніться до нашої служби підтримки
                </p>
            </div>
        </div>
    );
}