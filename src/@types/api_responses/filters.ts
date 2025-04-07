interface PaginationOut {
    offset: number;
    limit: number;
    total: number;
}

interface PaginationIn {
    offset: number;
    limit: number;
}

interface Filters {
    category_slug?: string;
}

interface Ordering {
    field: string;
    ordering: string;
}