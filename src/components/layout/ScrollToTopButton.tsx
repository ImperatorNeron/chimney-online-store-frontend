"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-20 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUpIcon className="h-6 w-6" />
        </button>
    );
}
