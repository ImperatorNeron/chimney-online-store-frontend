/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

export default function useCategoryToggle() {
    const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleCategory = (slug: string) => {
        setExpandedSlug(prevSlug => (prevSlug === slug ? null : slug));
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (expandedSlug) {
            const ref = categoryRefs.current[expandedSlug];
            if (ref && !ref.contains(e.target as Node)) {
                setExpandedSlug(null);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [expandedSlug]);

    return { expandedSlug, toggleCategory, categoryRefs };
}
