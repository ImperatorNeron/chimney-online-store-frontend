interface ApiResponseList<T> {
    data: {
        items: T[];
        pagination: PaginationOut;
    };
    meta: Record<string, unknown>;
    errors: Array<{
        code: string;
        message: string;
        meta: Record<string, unknown>;
    }>;
}

interface ApiResponseOne<T> {
    data: T;
    meta: Record<string, unknown>;
    errors: Array<{
        code: string;
        message: string;
        meta: Record<string, unknown>;
    }>;
}
