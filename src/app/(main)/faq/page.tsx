'use client';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { faqItems } from '@/constants/FAQ';
import QuestionBlock from '@/app/(main)/faq/components/QuestionBlock';

export default function FAQPage() {

    return (
        <div>
            <Breadcrumbs items={[{ title: "Головна", href: "/" }, { title: "Питання та відповіді" }]} />
            <div className="py-16 md:py-20 lg:py-30 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 md:mb-20 lg:mb-28">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Поширені запитання
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700">
                            Знайдіть відповіді на найпопулярніші питання
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {faqItems.map((item, index) => (
                            <QuestionBlock key={index} item={item} index={index} />
                        ))}
                    </div>

                    <div className="mt-8 md:mt-12 text-center">
                        <button
                            className="inline-flex items-center px-10 py-3 bg-gray-900 text-white rounded-xl hover:shadow-xl transition-all duration-300 text-lg font-medium shadow-lg"
                        >
                            Показати ще
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};
