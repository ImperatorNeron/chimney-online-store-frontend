import Image from 'next/image';
import Link from 'next/link';

const SocialLinks = ({ links }: SocialLinksProps) => (
    <div className="flex space-x-4">
        {links.map(({ href, icon, alt }, index) => (
            <Link key={index} href={href} className="hover:opacity-75 transition">
                <Image src={icon} alt={alt} width={32} height={32} className="filter invert" />
            </Link>
        ))}
    </div>
);

export default SocialLinks;