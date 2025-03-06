"use client";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import MessageNotification from "@/components/Notifications/Notification";
import ContactBlock from "@/page-components/contacts/ContactBlock";
import ContactForm from "@/page-components/contacts/ContactForm";
import MapBlock from "@/page-components/contacts/MapBlock";
import TitleBlock from "@/page-components/contacts/TitleBlock";
import { useState } from "react";

const ContactsPage = () => {
    const [notification, setNotification] = useState<NotificationProps | null>(null);
    return (
        <div>
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Контакти" }
            ]} />
            <div className="min-h-screen bg-white flex flex-col items-center p-2 sm:p-6 lg:p-8">
                <div className="max-w-5xl w-full">
                    <TitleBlock />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-8">
                        <ContactBlock />
                        <ContactForm onSuccess={setNotification} />
                        <MessageNotification notification={notification} />
                    </div>
                    <MapBlock />
                </div>
            </div>
        </div>

    );
};

export default ContactsPage;
