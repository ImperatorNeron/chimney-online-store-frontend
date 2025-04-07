export async function fetchProducts(
    paginationIn: PaginationIn,
    ordering?: Ordering,
    filters?: Filters,
): Promise<{ items: Product[]; pagination: PaginationOut }> {

    const params = new URLSearchParams();

    params.append("offset", String(paginationIn.offset));
    params.append("limit", String(paginationIn.limit));

    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined && value !== null && value !== "") {
                params.append(key, String(value));
            }
        }
    }

    if (ordering && ordering.field && ordering.ordering) {
        params.append("field", ordering.field);
        params.append("ordering", ordering.ordering);
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`
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

