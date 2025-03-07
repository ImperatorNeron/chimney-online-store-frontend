import Link from 'next/link';
import { FC } from "react";

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
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
                                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <span
                                className="ml-2 text-gray-900 font-medium"
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

export default Breadcrumbs;