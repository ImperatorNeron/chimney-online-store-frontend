import Image from 'next/image';
import Link from 'next/link';

interface ContactItem {
    icon: string;
    text: string;
    alt: string;
    href?: string;
}

interface ContactInfoProps {
    items: ContactItem[];
}

export default function ContactInfo({ items }: ContactInfoProps) {
    return (
        <ul className="space-y-3">
            {items.map(({ icon, text, alt, href }, index) => (
                <li key={index} className="flex items-center space-x-2">
                    <Image src={icon} alt={alt} width={20} height={20} className="filter invert" />
                    {href ? (
                        <Link href={href} className="hover:text-white transition-colors">{text}</Link>
                    ) : (
                        <span>{text}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}
