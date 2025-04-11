import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ContactBlock from "@/app/(main)/contacts/components/ContactBlock";
import ContactForm from "@/components/modules/contacts/components/ContactForm";
import MapBlock from "@/app/(main)/contacts/components/MapBlock";
import TitleBlock from "@/app/(main)/contacts/components/TitleBlock";

export default function ContactsPage() {
    return (
        <div>
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Контакти" }
            ]} />
            <div className="flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
                <div className="max-w-7xl w-full">
                    <TitleBlock />
                    <ContactBlock />
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-8 lg:gap-10 mt-8 md:mt-24 px-2 sm:px-5">
                        <MapBlock />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

