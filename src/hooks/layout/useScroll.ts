import { useState, useEffect } from 'react';

export default function useScroll() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const handleScroll = () => {
        setScrollY(window.scrollY);
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return { scrollY, isScrolled, isClient };
};
