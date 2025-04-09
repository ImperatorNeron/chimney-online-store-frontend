import Image from "next/image";
import Link from "next/link";

export default function NavigationLink({ href, iconSrc, alt, label, count, countColor, onClose }: NavItemProps) {
    return (
        <Link
            href={href}
            onClick={onClose}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
        >
            <div className="flex items-center gap-3">
                <Image src={iconSrc} alt={alt} width={24} height={24} className="w-6 h-6" />
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
