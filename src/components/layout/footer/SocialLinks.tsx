import Image from 'next/image';
import Link from 'next/link';

interface SocialLink {
    href: string;
    icon: string;
    alt: string;
}

interface SocialLinksProps {
    links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
    return (
        <div className="flex space-x-4">
            {links.map(({ href, icon, alt }, index) => (
                <Link key={index} href={href} className="hover:opacity-75 transition">
                    <Image src={icon} alt={alt} width={32} height={32} className="filter invert" />
                </Link>
            ))}
        </div>
    );
};