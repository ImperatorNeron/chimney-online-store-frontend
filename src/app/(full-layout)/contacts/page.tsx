import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ContactBlock from "@/app/(full-layout)/contacts/components/ContactBlock";
import ContactForm from "@/components/modules/contacts/components/ContactForm";
import TitleBlock from "@/app/(full-layout)/contacts/components/TitleBlock";

export default function ContactsPage() {
    return (
        <div className="min-h-screen">
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Контакти" }
            ]} />
            <div className="flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    <TitleBlock />
                    <ContactBlock />
                    <div className="mx-auto rounded-xl sm:py-8 max-w-[700px]">
                        <div className="mb-8 lg:mb-12 text-center">
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                                Напишіть нам прямо зараз
                            </h3>
                            <p className="text-gray-600 max-w-xl mx-auto">
                                Залишіть свої контакти і ми обов'язково зв'яжемося з вами протягом години
                            </p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

