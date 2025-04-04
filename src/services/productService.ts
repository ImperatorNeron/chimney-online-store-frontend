export async function fetchProducts(
    offset: number,
    limit: number
): Promise<{ items: Product[]; pagination: PaginationOut }> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?offset=${encodeURIComponent(
            offset
        )}&limit=${encodeURIComponent(limit)}`
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponseList<Product> = await response.json();

    if (data.errors?.length > 0) {
        throw new Error(data.errors[0].message);
    }

    return {
        items: data.data.items,
        pagination: data.data.pagination
    };
};

export async function fetchProduct(
    slug: string
): Promise<{ item: Product }> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${encodeURIComponent(slug)}`
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponseOne<Product> = await response.json();

    if (data.errors?.length > 0) {
        throw new Error(data.errors[0].message);
    }

    return { item: data.data };
};

