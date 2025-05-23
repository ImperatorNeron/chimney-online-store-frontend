interface Preview {
    file_path: string;
    filename: string;
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


interface BaseProductSchema {
    name: string;
    slug: string;
    description?: string;
    price: number;
    extra_attrs?: Record<string, any>;
    category_id: number;
}

interface ReadProductSchema extends BaseProductSchema {
    id: number;
    created_at: string;
    updated_at: string;
    discount_price: number;
    discount_percentage: number;
    diameter?: string;
    length?: string;
    thickness?: string;
    angle?: string;
    metal_type?: string;
}

interface CreateProductSchema extends BaseProductSchema { }

interface ReadProductImageSchema {
    id: string | number;
    filename: string;
    alt: string;
}

interface ReadPreviewProductSchema extends ReadProductSchema {
    preview?: ReadProductImageSchema;
}

interface ReadFullProductSchema extends ReadProductSchema {
    images: ReadProductImageSchema[];
}

interface ReadFullProductWithCategoryHierarchySchema extends ReadFullProductSchema{
    categories: string[][]
}

interface ReadUniqueProductSchema {
    id: number;
    name: string;
    slug: string;
    description?: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}
