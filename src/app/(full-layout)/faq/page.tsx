import Breadcrumbs from '@/components/layout/Breadcrumbs';
import QuestionBlock from '@/app/(full-layout)/faq/components/QuestionBlock';
import { faqService } from '@/api/services/faq.service';

export const metadata = {
  title: "Питання та відповіді",
  description: "Відповіді на поширені питання про димоходи: вибір діаметра, монтаж, доставка, оплата та гарантія. Консультація фахівців.",
  keywords: ["питання про димоходи", "як вибрати димохід", "монтаж димоходу", "faq димоходи", "діаметр димоходу"],
  openGraph: {
    title: "Питання та відповіді про димоходи | Димок",
    description: "Відповіді на поширені питання про вибір, монтаж і доставку димоходів.",
    locale: "uk_UA",
    type: "website",
  },

};

export default async function FAQPage() {

    const items = await faqService.getFAQS();

    return (
        <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">
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
                        {(items ?? []).map((item, index) => (
                            <QuestionBlock key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};