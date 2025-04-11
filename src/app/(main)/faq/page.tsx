'use client';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { faqItems } from '@/constants/FAQ';
import QuestionBlock from '@/app/(main)/faq/components/QuestionBlock';

export default function FAQPage() {
    return (
        <div className="bg-white">
            <Breadcrumbs items={[{ title: "Головна", href: "/" }, { title: "Питання та відповіді" }]} />
            <div className="py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
                <div className="mx-auto sm:px-6 lg:px-8 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                    <div className="text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24">
                        <h1 className="text-3xl sm:text-4xl font-medium text-black mb-4 md:mb-5">
                            Поширені запитання
                        </h1>
                        <p className="text-base px-4 sm:text-lg text-gray-600">
                            Ознайомтесь з відповідями на найпоширеніші запити
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-5 lg:space-y-6">
                        {faqItems.map((item, index) => (
                            <QuestionBlock key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};