interface Product {
    id: number;
    image: string;
    title: string;
    discount?: number;
    oldPrice?: number;
    price: number;
    slug?: string;
}

interface ItemCardProps {
    product: Product;
    className?: string;
}