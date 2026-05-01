'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { websiteSettingsService, SiteContactInfo } from "@/api/services/websiteSettings.service";

export default function PrimaryInformation() {
    const [settings, setSettings] = useState<SiteContactInfo | null>(null);

    useEffect(() => {
        websiteSettingsService.getPublicSettings().then(setSettings).catch(() => {});
    }, []);

    const schedule = settings?.work_schedule || "Пн-Пт: 9:00-18:00";
    const phone = settings?.phone || "(050) 12-34-567";
    const email = settings?.email || "info@example.com";
    const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="mr-4 font-semibold flex items-center gap-2">
                <Image src="/icons/clock.png" alt="" width={16} height={16} />
                {schedule}
            </div>
            <div className="mr-4 font-semibold flex items-center gap-2">
                <Image src="/icons/phone-call.png" alt="" width={16} height={16} />
                <Link href={phoneHref}>{phone}</Link>
            </div>
            <div className="mr-4 font-semibold flex items-center gap-2">
                <Image src="/icons/mail.png" alt="" width={16} height={16} />
                <Link href={`mailto:${email}`}>{email}</Link>
            </div>
        </div>
    );
}
