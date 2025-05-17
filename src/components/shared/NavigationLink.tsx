import Image from "next/image";
import Link from "next/link";
import { ElementType } from "react";

interface NavItemProps {
    href: string;
    iconSrc?: string;
    heroIcon?: ElementType;
    alt?: string;
    label: string;
    count?: number;
    countColor?: string;
    onClose: () => void;
}

export default function NavigationLink({
    href,
    iconSrc,
    heroIcon: HeroIcon,
    alt = "icon",
    label,
    count,
    countColor,
    onClose
}: NavItemProps) {
    return (
        <Link
            href={href}
            onClick={onClose}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
        >
            <div className="flex items-center gap-3">
                {iconSrc ? (
                    <Image src={iconSrc} alt={alt} width={24} height={24} className="w-6 h-6" />
                ) : HeroIcon ? (
                    <HeroIcon className="w-6 h-6" />
                ) : null}
                <span className="text-gray-900 font-medium">{label}</span>
            </div>
            {count !== undefined && (
                <span className={`${countColor} text-white text-sm px-2 py-0.5 rounded-full`}>
                    {count}
                </span>
            )}
        </Link>
    );
}
