import { useEffect, useState, useCallback } from "react";

export default function useOverlay(isOpen: boolean) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const setPadding = useCallback((value: string) => {
        document.body.style.paddingRight = value;
        const header = document.querySelector("header");
        if (header) {
            (header as HTMLElement).style.paddingRight = value;
        }
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let rafId: number;

        if (isOpen) {
            setMounted(true);
            rafId = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                    document.documentElement.style.overflow = "hidden";
                    const isLg = window.matchMedia("(min-width: 1024px)").matches;
                    setPadding(isLg ? "15px" : "");
                });
            });
        } else {
            setIsVisible(false);
            document.documentElement.style.overflow = "";
            setPadding("");
            timer = setTimeout(() => setMounted(false), 300);
        }

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [isOpen, setPadding]);

    useEffect(() => {
        return () => {
            document.documentElement.style.overflow = "";
            setPadding("");
        };
    }, [setPadding]);

    return { mounted, isVisible };
}
