import { useState, useEffect } from 'react';

export default function useHeaderTransform() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [transform, setTransform] = useState('none');

    const handleScroll = () => {
        setScrollY(window.scrollY);
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        const headerTopHeight = 40;
        const width = window.innerWidth;

        if (width >= 1024) {
            setTransform(`translateY(${scrollY < headerTopHeight ? -scrollY : -headerTopHeight}px)`);
        } else {
            setTransform('none');
        }
    }, [scrollY]);

    return { scrollY, isScrolled, transform };
};
