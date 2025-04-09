import { MapPinIcon, DevicePhoneMobileIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ContactItem from './ContactItem';

export default function ContactBlock() {
    return (
        <div className="space-y-6 flex-1">
            <ContactItem
                icon={<MapPinIcon className='w-6 h-6 text-gray-600' />}
                title="Адреса"
                content={
                    <div>
                        вул. Центральна, 123<br />
                        Київ, Україна
                    </div>
                }
            />
            <ContactItem
                icon={<DevicePhoneMobileIcon className='w-6 h-6 text-gray-600' />}
                title="Телефон"
                content={<a href='#'>+38 (099) 123-4567</a>}
            />
            <ContactItem
                icon={<EnvelopeIcon className='w-6 h-6 text-gray-600' />}
                title="Email"
                content={<a href='#'>contact@example.com</a>}
            />
            <ContactItem
                icon={<LinkIcon className='w-6 h-6 text-gray-600' />}
                title="Соцмережі"
                content={
                    <div className="flex space-x-3 mt-1">
                        <a href="#" className="text-gray-600 hover:text-black transition-colors">
                            Telegram
                        </a>
                        <a href="#" className="text-gray-600 hover:text-black transition-colors">
                            Facebook
                        </a>
                        <a href="#" className="text-gray-600 hover:text-black transition-colors">
                            Instagram
                        </a>
                    </div>
                }
            />
        </div>
    );
};
