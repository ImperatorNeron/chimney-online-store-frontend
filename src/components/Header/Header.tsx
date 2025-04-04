'use client';
import { HeaderBottom } from "./components/desktop/HeaderBottom";
import { HeaderTop } from "./components/desktop/HeaderTop";
import { useScroll } from "@/hooks/common/useScroll";

export const Header = () => {
    const { scrollY, isScrolled, isClient } = useScroll();
    const headerTopHeight = 40;

    if (!isClient) {
        return null;
    }

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'shadow-md' : ''} 
        lg:transition-transform lg:duration-300`}
            style={{
                transform: window.innerWidth >= 1024
                    ? `translateY(${scrollY < headerTopHeight ? -scrollY : -headerTopHeight}px)`
                    : 'none',
            }}
        >
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
};