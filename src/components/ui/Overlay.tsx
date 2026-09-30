import useOverlay from "@/hooks/ui/useOverlay";
import { createPortal } from "react-dom";

interface OverlayProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
};

export default function Overlay({ isOpen, onClose, className, children }: OverlayProps) {
    const { mounted, isVisible } = useOverlay(isOpen);

    if (!mounted) return null;

    return createPortal(
        <div
            className={
                `fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-[9999] 
                ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`
            }
            onClick={onClose}
        >
            <div
                className={
                    `fixed inset-y-0 right-0 w-5/6 sm:w-3/6 lg:w-2/5 bg-white transform 
                    transition-transform duration-300 ease-in-out shadow-2xl 
                    ${isVisible ? "translate-x-0" : "translate-x-full"} ${className}`
                }
                onClick={(e) => e.stopPropagation()}
                style={{ willChange: "transform" }}
            >
                <div className="overflow-y-auto h-full">{children}</div>
            </div>
        </div>,
        document.body
    );
}
