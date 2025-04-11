import { DevicePhoneMobileIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import ContactItem from './ContactItem';

export default function ContactBlock() {
    return (
        <div className="flex-1 flex lg:justify-around flex-col lg:flex-row lg:items-center lg:gap-6">
            <ContactItem
                icon={<DevicePhoneMobileIcon className='w-7 h-7 text-gray-600' />}
                title="Телефон"
                content={<Link href='#' className="hover:text-gray-600 transition-colors">+38 (099) 123-4567</Link>}
            />
            <ContactItem
                icon={<EnvelopeIcon className='w-7 h-7 text-gray-600' />}
                title="Email"
                content={<Link href='#' className="hover:text-gray-800 transition-colors">contact@example.com</Link>}
            />
            <ContactItem
                icon={<LinkIcon className='w-7 h-7 text-gray-600' />}
                title="Соцмережі"
                content={
                    <div className="flex gap-2 lg:gap-3 mt-1">
                        <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Telegram
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Facebook
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Instagram
                        </Link>
                    </div>
                }
            />
        </div>
    );
};

