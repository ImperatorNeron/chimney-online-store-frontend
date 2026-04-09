import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackToPageButton({ href, title }: { href: string; title: string }) {
    return (
        <div className="mt-6 mb-6">
            <Link
                href={href}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                           bg-gray-100 text-gray-700 text-sm font-medium
                           shadow-sm hover:bg-gray-200 hover:shadow
                           transition-all duration-200"
            >
                <ArrowLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                {title}
            </Link>
        </div>
    );
}
