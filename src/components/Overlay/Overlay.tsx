import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type OverlayProps = {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
};

export default function Overlay({ isOpen, onClose, className, children }: OverlayProps) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let rafId: number;

        if (isOpen) {
            setMounted(true);
            rafId = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                    document.documentElement.style.overflow = "hidden";
                });
            });
        } else {
            setIsVisible(false);
            document.documentElement.style.overflow = "";
            timer = setTimeout(() => {
                setMounted(false);
            }, 300);
        }

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [isOpen]);

    useEffect(() => {
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-[9999] 
                ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={onClose}
        >
            <div
                className={`fixed inset-y-0 right-0 w-5/6 lg:w-2/5 bg-white transform transition-transform duration-300 ease-in-out shadow-2xl 
                    ${isVisible ? "translate-x-0" : "translate-x-full"} ${className}`}
                onClick={(e) => e.stopPropagation()}
                style={{ willChange: "transform" }}
            >
                <div className="overflow-y-auto h-full">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
