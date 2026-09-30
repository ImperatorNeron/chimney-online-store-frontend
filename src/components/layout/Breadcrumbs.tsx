import Link from 'next/link';

interface BreadcrumbItem {
    title: string;
    href?: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Навігаційна панель" className='border-t border-b py-3 -mx-3'>
            <ol className="flex items-center gap-1 text-sm overflow-x-auto px-4" itemScope itemType="https://schema.org/BreadcrumbList">
                {items.map((item, index) => (
                    <li key={item.title} className="flex items-center whitespace-nowrap" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        {index > 0 && (
                            <div className="mx-2 text-gray-400">/</div>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                itemProp="item"
                            >
                                <span itemProp="name">{item.title}</span>
                            </Link>
                        ) : (
                            <span itemProp="name" className="text-gray-900">
                                {item.title}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};