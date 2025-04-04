interface Preview {
    file_path: string;
    alt: string;
    product_id: number;
    id: number;
}

interface Product {
    name: string;
    slug: string;
    description: string;
    price: number;
    discount_price: number;
    discount_percentage: number;
    category_id: number;
    id: number;
    created_at: string;
    updated_at: string;
    preview: Preview;
}

interface ItemCardProps {
    product: Product;
    className?: string;
}