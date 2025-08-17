import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackToPageButton({ href, title }: { href: string, title: string }) {
    return (
        <div className="flex items-center mt-7 mb-4">
            <Link
                href={href}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                <span className="font-bold">{title}</span>
            </Link>
        </div>
    );
}