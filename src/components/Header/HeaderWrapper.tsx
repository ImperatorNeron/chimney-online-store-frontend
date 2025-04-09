'use client';
import { useScroll } from '@/hooks/common/useScroll';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';


export const HeaderWrapper = ({ children }: { children: ReactNode }) => {
    const { scrollY, isScrolled } = useScroll();
    const [transform, setTransform] = useState('none');

    useEffect(() => {
        const headerTopHeight = 40;
        const width = window.innerWidth;

        if (width >= 1024) {
            setTransform(`translateY(${scrollY < headerTopHeight ? -scrollY : -headerTopHeight}px)`);
        } else {
            setTransform('none');
        }
    }, [scrollY]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow' : ''
                } lg:transition-transform lg:duration-300`}
            style={{ transform }}
        >
            {children}
        </header>
    );
};
