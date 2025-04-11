import { MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default function MapBlock() {
    return (
        <div className="relative w-full h-[300px] sm:h-[500px] lg:h-full rounded-lg overflow-hidden order-2 lg:order-none">
            <iframe
                title="Карта"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25377.95550749884!2d30.450263!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5d63d1c6f3%3A0x3f6f3b8a8a0a3f!2z0JrQuNC80LjRjyDRgtGA0LXQu9GM0YLRgNC40Y8!5e0!3m2!1suk!2sua!4v1680943177663!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className='absolute bg-white top-4 right-4 p-3 rounded shadow-lg border'>
                <p className="text-gray-600 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-600" />
                    <Link href="#"> Київ, вул. Хрещатик, 1</Link>
                </p>
            </div>
        </div>
    );
};