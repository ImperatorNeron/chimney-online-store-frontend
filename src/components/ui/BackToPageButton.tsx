import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackToPageButton({ href, title }: { href: string; title: string }) {
    return (
        <div className="mt-6 mb-16 ml-16">
            <Link
                href={href}
                className="group inline-flex items-center gap-2 text-gray-700 font-semibold transition-colors duration-200 hover:text-gray-900"
            >
                <ArrowLeftIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="relative">
                    {title}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                </span>
            </Link>
        </div>
    );
}
