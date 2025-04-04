import Link from "next/link";

export default function EmptyCart() {
    return (
        <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8 w-48 h-48 flex items-center justify-center">
                {/* Стильний фон для іконки */}
                <div className="absolute inset-0 bg-gray-50 rounded-full"></div>

                {/* Сучасна іконка кошика */}
                <svg
                    width="96"
                    height="96"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative text-gray-300"
                >
                    <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16 10L16 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M8 10L8 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="text-center space-y-4">
                <h1 className="text-2xl font-medium text-gray-900">Ой, Ваш кошик порожній</h1>
                <p className="text-gray-500 max-w-md">
                    Почніть свої покупки з нашого каталогу - знайдіть ідеальні матеріали для себе
                </p>

                <div className="pt-6">
                    <Link
                        href="/catalog"
                        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 inline-flex items-center justify-center gap-2"
                    >
                        Перейти до покупок
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0 -mr-1"
                        >
                            <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}