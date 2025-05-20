import { useState } from 'react';

export default function usePagination(initialState = { limit: 3, offset: 0 }) {
    const [currentOffset, setCurrentOffset] = useState(initialState.offset);
    const [currentLimit, setCurrentLimit] = useState(initialState.limit);
    const [total, setTotal] = useState(0);

    const handleNextPage = () => {
        setCurrentOffset((prev) => prev + currentLimit);
    };

    const handlePrevPage = () => {
        setCurrentOffset((prev) => Math.max(0, prev - currentLimit));
    };

    return {
        currentOffset,
        currentLimit,
        total,
        setTotal,
        setCurrentLimit,
        handleNextPage,
        handlePrevPage,
    };
}
