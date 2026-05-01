import { DevicePhoneMobileIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import ContactItem from './ContactItem';
import { websiteSettingsService } from '@/api/services/websiteSettings.service';

export default async function ContactBlock() {
    const settings = await websiteSettingsService.getPublicSettings();

    const phone = settings?.phone || "+38 (099) 123-4567";
    const email = settings?.email || "contact@example.com";
    const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-16 lg:mb-20" itemScope itemType="https://schema.org/LocalBusiness">
            <ContactItem
                icon={<DevicePhoneMobileIcon className='w-7 h-7 text-gray-700' />}
                title="Телефон"
                content={<Link href={phoneHref} className="hover:text-gray-700 transition-colors text-md">{phone}</Link>}
            />
            <ContactItem
                icon={<EnvelopeIcon className='w-7 h-7 text-gray-700' />}
                title="Email"
                content={<Link href={`mailto:${email}`} className="hover:text-gray-900 transition-colors text-md">{email}</Link>}
            />
            <ContactItem
                icon={<LinkIcon className='w-7 h-7 text-gray-700' />}
                title="Соцмережі"
                content={
                    <div className="flex gap-3 mt-2">
                        <Link href={settings?.telegram_url || "https://t.me"} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1" aria-label="Telegram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.258-.428.258l.213-3.05 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.874 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.54-4.458c.535-.196 1.006.128.832.941z" />
                            </svg>Telegram
                        </Link>
                        <Link href={settings?.facebook_url || "https://facebook.com"} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                        </Link>
                    </div>
                }
            />
        </div>
    );
}
