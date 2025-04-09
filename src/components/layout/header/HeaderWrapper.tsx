'use client'
import useHeaderTransform from "@/hooks/layout/useHeaderTransform";
import { ReactNode } from "react";

export default function HeaderWrapper({ children }: { children: ReactNode }) {
    const { transform, isScrolled } = useHeaderTransform();

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
