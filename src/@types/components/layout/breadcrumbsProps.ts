interface BreadcrumbItem {
    title: string;
    href?: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
};