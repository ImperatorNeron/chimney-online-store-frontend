import Link from 'next/link';

export default function QuickLinks({ links }: QuickLinksProps) {
    return (
        <div className="space-y-1 flex flex-col">
            {links.map(({ href, label }, index) => (
                <Link key={index} href={href} className="hover:text-white transition">
                    {label}
                </Link>
            ))}
        </div>
    )
}