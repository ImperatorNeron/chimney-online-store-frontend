import Image from 'next/image';

const ContactInfo = ({ items }: ContactInfoProps) => (
    <ul className="space-y-3">
        {items.map(({ icon, text, alt }, index) => (
            <li key={index} className="flex items-center space-x-2">
                <Image src={icon} alt={alt} width={20} height={20} className="filter invert" />
                <span>{text}</span>
            </li>
        ))}
    </ul>
);

export default ContactInfo;