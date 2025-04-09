import Link from 'next/link';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className='border-t border-b py-3 -mx-3'>
            <ol className="flex items-center gap-1 text-sm overflow-x-auto px-4">
                {items.map((item, index) => (
                    <li key={item.title} className="flex items-center whitespace-nowrap">
                        {index > 0 && (
                            <div className="mx-2 text-gray-400">/</div>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <span
                                className="text-gray-900"
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