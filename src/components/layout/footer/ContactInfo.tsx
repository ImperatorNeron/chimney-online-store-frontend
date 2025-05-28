import Image from 'next/image';

interface ContactItem {
    icon: string;
    text: string;
    alt: string;
}

interface ContactInfoProps {
    items: ContactItem[];
}

export default function ContactInfo({ items }: ContactInfoProps) {
    return (
        <ul className="space-y-3">
            {items.map(({ icon, text, alt }, index) => (
                <li key={index} className="flex items-center space-x-2">
                    <Image src={icon} alt={alt} width={20} height={20} className="filter invert" />
                    <span>{text}</span>
                </li>
            ))}
        </ul>
    );
};