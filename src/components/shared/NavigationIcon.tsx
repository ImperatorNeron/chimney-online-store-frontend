import Image from 'next/image';
import Link from 'next/link';

export default function NavigationIcon({ href, iconSrc, alt, count, countColor, label }: NavIconProps) {
    return (
        <Link href={href} className="text-gray-600 flex flex-col items-center p-2 rounded transition duration-300 transform hover:scale-110 relative group">
            <Image src={iconSrc} alt={alt} width={24} height={24} />
            {count !== undefined && (
                <span className={`absolute top-0 right-0 ${countColor} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center translate-x-2 -translate-y-2`}>
                    {count}
                </span>
            )}
            <span className="absolute top-full mt-2 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg">
                {label}
            </span>
        </Link>
    );
};