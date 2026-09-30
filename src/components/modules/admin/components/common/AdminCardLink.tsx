import Link from "next/link";

export default function CardLink({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: React.ReactNode }) {
    return (
        <Link href={href} className="block border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-300">
                    {icon}
                </div>

                <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
            </div>
        </Link>
    );
}