import Link from 'next/link';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
                {items.map((item, index) => (
                    <li key={item.title} className="flex items-center">
                        {index > 0 && (
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-gray-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="ml-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 line-clamp-1"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <span
                                className="ml-1 text-gray-900 font-medium line-clamp-1"
                                aria-current="page"
                            >
                                {item.title}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
