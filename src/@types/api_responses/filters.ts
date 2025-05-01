interface PaginationOut {
    offset: number;
    limit: number;
    total: number;
}

interface PaginationIn {
    offset: number;
    limit: number;
}

type BaseFilters = {
    diameter?: string;
    length?: string;
    thickness?: string;
    angle?: string;
    metal_type?: string;
    min_price: number;
    max_price: number;
    // [key: string]: string | undefined;
}

interface Filters extends BaseFilters {
    category_slug?: string;
    text?: string;
}

interface Ordering {
    field: string;
    ordering: string;
}