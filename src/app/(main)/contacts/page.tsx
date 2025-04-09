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
            <div className="min-h-screen bg-white flex flex-col items-center p-2 sm:p-6 lg:p-8 mt-8">
                <div className="max-w-5xl w-full">
                    <TitleBlock />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-8">
                        <ContactBlock />
                        <ContactForm />
                    </div>
                    <MapBlock />
                </div>
            </div>
        </div>

    );
};

